import type { Handler } from '@netlify/functions'
import sanitize from '@/utils/sanitize'
import validations from '@/utils/validations'
import type { Contact } from '@/types/contact'

const KEYS: (keyof Contact)[] = ['firstName', 'lastName', 'email', 'message']

const handler: Handler = async ({ httpMethod, body }) => {
	if (httpMethod !== 'POST') {
		return {
			statusCode: 405,
			body: JSON.stringify({ error: 'Method Not Allowed' }),
		}
	} else if (!body) {
		return {
			statusCode: 400,
			body: JSON.stringify({ error: 'Missing data in body' }),
		}
	}

	try {
		const data = JSON.parse(body) as Contact
		const keysFound = Object.keys(data)
		// If there are a difference in the keys found and the keys we expect,
		if (keysFound.length !== KEYS.length) {
			return {
				statusCode: 400,
				body: JSON.stringify({
					// Set the error to have a property of the missing keys and keys that
					// were not expected
					errors: { missing: KEYS.filter((key) => !keysFound.includes(key)) },
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

			keysFound.push(key)
		}

		// If any errors were found, return the error response
		if (Object.keys(errors).length) {
			return {
				statusCode: 400,
				body: JSON.stringify({ errors }),
			}
		}

		// TODO: Send email

		return { statusCode: 201, body: JSON.stringify({ ...data }) }
		// This is catching an error when calling JSON.parse(body)
	} catch (err) {
		console.error(err)
		return {
			statusCode: 500,
			body: JSON.stringify({ error: 'Something wrong happened. Probs bad JSON input' }),
		}
	}
}

export { handler }
