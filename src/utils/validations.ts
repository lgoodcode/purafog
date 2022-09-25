import { nameRegex, phoneRegex, emailRegex, messageRegex } from '@/utils/regex'
import type { Contact } from '@/types/contact'
import type { Validations } from './useForm'

const validations: Validations<Contact> = {
	firstName: {
		required: 'Must enter your first name',
		pattern: {
			value: nameRegex,
			message: 'Please enter a valid name',
		},
	},
	lastName: {
		required: 'Must enter your last name',
		pattern: {
			value: nameRegex,
			message: 'Please enter a valid name',
		},
	},
	email: {
		required: 'Must enter your email address',
		pattern: {
			value: emailRegex,
			message: 'Please enter a valid email address',
		},
	},
	phone: {
		pattern: {
			value: phoneRegex,
			message: 'Please enter a valid phone number',
		},
	},
	message: {
		required: "Please enter a brief message of what you're inquiring on",
		pattern: {
			value: messageRegex,
			message: 'Please enter a valid message',
		},
	},
}

export default validations
