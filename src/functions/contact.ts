import type { Handler } from '@netlify/functions'
import fetch from 'node-fetch'
import sanitize from '@/utils/sanitize'
import validations from '@/utils/validations'

if (!process.env.SENDINBLUE_API_KEY) {
  throw new Error('Missing SENDINBLUE_API_KEY')
}

if (!process.env.TO_EMAIL) {
  throw new Error('Missing TO_EMAIL')
}

if (!process.env.FROM_EMAIL) {
  throw new Error('Missing FROM_EMAIL')
}

if (!process.env.TEMPLATE_ID) {
  throw new Error('Missing TEMPLATE_ID')
}

const KEYS: (keyof Contact)[] = ['firstName', 'lastName', 'email', 'message']
const headers = {
  accept: 'application/json',
  'Content-Type': 'application/json',
  'api-key': process.env.SENDINBLUE_API_KEY,
}

const createMessage = (data: Contact) => {
  const { firstName, lastName, phone, email, message } = data
  const name = `${firstName} ${lastName}`

  return JSON.stringify({
    sender: {
      name: process.env.FROM_NAME || 'PURaFOG',
      email: process.env.FROM_EMAIL,
    },
    to: {
      name: process.env.TO_NAME || 'PURaFOG',
      email: process.env.TO_EMAIL,
    },
    templateId: process.env.TEMPLATE_ID,
    params: {
      NAME: name,
      EMAIL: email,
      PHONE: phone,
      MESSAGE: message,
    },
  })
}

const handler: Handler = async ({ httpMethod, body }) => {
  if (httpMethod !== 'POST') {
    console.error(`Method ${httpMethod} not allowed`)

    return {
      headers,
      statusCode: 405,
      body: JSON.stringify({ error: 'Method Not Allowed' }),
    }
  } else if (!body) {
    console.error('No body')

    return {
      headers,
      statusCode: 400,
      body: JSON.stringify({ error: 'Missing data in body' }),
    }
  }

  try {
    const data = JSON.parse(body) as Contact
    const keysFound = Object.keys(data)
    // If we don't have all the required properties
    if (!KEYS.every((key) => keysFound.includes(key as keyof Contact))) {
      const missing = KEYS.filter((key) => !keysFound.includes(key))

      console.error(`Missing keys: ${missing.join(', ')}`)

      return {
        headers,
        statusCode: 400,
        body: JSON.stringify({
          // Set the error to have a property of an array of the missing keys
          errors: { missing },
        }),
      }
    }

    const errors: Partial<Record<keyof Contact, string>> = {}
    const result = {} as Contact

    for (const [key, value] of Object.entries(data) as [keyof Contact, string][]) {
      const required = validations[key]?.required
      const pattern = validations[key]?.pattern

      if (required && !value) {
        errors[key] = `Invalid ${key}: missing required field`
      } else if (pattern && !pattern.value.test(value)) {
        errors[key] = `Invalid ${key}: failed pattern test`
      } else {
        result[key] = sanitize(value)
      }
    }

    // If any errors were found, return the error response
    if (Object.keys(errors).length) {
      console.error(`Errors: ${JSON.stringify(errors)}`)

      return {
        headers,
        statusCode: 400,
        body: JSON.stringify({ errors }),
      }
    }

    // Send the email
    try {
      const res = await fetch('https://api.sendinblue.com/v3/smtp/email', {
        method: 'POST',
        headers,
        body: createMessage(result),
      })

      console.log(await res.json())

      return { statusCode: 201 }
    } catch (err) {
      console.error(err)

      return {
        headers,
        statusCode: 500,
        body: JSON.stringify({
          body: createMessage(result),
          message: (err as Error).message,
        }),
      }
    }
    // This is catching an error when calling JSON.parse(body)
  } catch (err) {
    console.error(err)

    return {
      headers,
      statusCode: 500,
      body: JSON.stringify({ error: 'Something wrong happened. Probs bad JSON input' }),
    }
  }
}

export { handler }
