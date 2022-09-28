import type { Handler } from '@netlify/functions'
import mailgun from 'mailgun-js'
import sanitize from '@/utils/sanitize'
import validations from '@/utils/validations'
import type { Contact } from '@/types/contact'

const KEYS: (keyof Contact)[] = ['firstName', 'lastName', 'email', 'message']
const headers = {
	'Content-Type': 'application/json',
}

if (!process.env.MAILGUN_API_KEY) {
	throw new Error('Missing MAILGUN_API_KEY')
}

if (!process.env.MAILGUN_DOMAIN) {
	throw new Error('Missing MAILGUN_DOMAIN')
}

if (!process.env.TO_EMAIL) {
	throw new Error('Missing TO_EMAIL')
}

if (!process.env.FROM_EMAIL) {
	throw new Error('Missing FROM_EMAIL')
}

if (!process.env.TEMPLATE) {
	throw new Error('Missing TEMPLATE')
}

const mg = mailgun({ apiKey: process.env.MAILGUN_API_KEY, domain: process.env.MAILGUN_DOMAIN })

const createMessage = (data: Contact) => {
	const { firstName, lastName, phone, email, message } = data
	const name = `${firstName} ${lastName}`

	return {
		to: process.env.TO_NAME
			? `${process.env.TO_NAME + ' ' || ''}<${process.env.TO_EMAIL}>`
			: process.env.TO_EMAIL,
		from: process.env.FROM_NAME
			? `${process.env.FROM_NAME + ' ' || ''}<${process.env.FROM_EMAIL}>`
			: process.env.TO_EMAIL,
		template: process.env.TEMPLATE || '',
		subject: 'New Contact',
		'h:X-Mailgun-Variables': JSON.stringify({
			name,
			email,
			phone,
			message,
		}),
	}
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
		const result: Partial<Contact> = {}

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

		try {
			await mg.messages().send(createMessage(result as Contact))

			console.log('Message sent')

			return { statusCode: 201 }
		} catch (err) {
			console.error(err)

			return {
				headers,
				statusCode: 500,
				body: JSON.stringify({ error: 'Failed to send message' }),
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
