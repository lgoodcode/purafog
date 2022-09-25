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
	} else if (!body)
		return {
			statusCode: 400,
			body: JSON.stringify({ error: 'Missing data in body' }),
		}

	const errors: Partial<Record<keyof Contact, string>> = {}
	const data: Partial<Contact> = {}
	const keysFound: (keyof Contact)[] = []

	try {
		for (const [key, value] of Object.entries(JSON.parse(body)) as [keyof Contact, string][]) {
			const required = validations[key]?.required
			const pattern = validations[key]?.pattern

			if (required && !value) {
				errors[key] = `Invalid ${key}: missing required field`
			} else if (pattern && !pattern.value.test(value)) {
				errors[key] = `Invalid ${key}: failed pattern test`
			} else {
				data[key] = sanitize(value)
			}

			keysFound.push(key)
		}

		if (Object.keys(errors).length) {
			return {
				statusCode: 400,
				body: JSON.stringify({ errors }),
			}
		} else if (keysFound.length !== KEYS.length) {
			return {
				statusCode: 400,
				body: JSON.stringify({
					errors: { missing: KEYS.filter((key) => !keysFound.includes(key)) },
				}),
			}
		}

		// TODO: Send email

		return { statusCode: 201, body: JSON.stringify({ data }) }
	} catch (err) {
		console.error(err)
		return {
			statusCode: 500,
			body: JSON.stringify({ error: 'Something wrong happened' }),
		}
	}
}

export { handler }
