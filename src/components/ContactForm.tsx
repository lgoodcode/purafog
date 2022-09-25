// import DOMPurify from 'dompurify'
import { useForm, type Validations } from '@/utils/useForm'
import PulseSpinner from '@/components/PulseSpinner'
import Input from './Input'
import TextArea from './TextArea'
// import type { EmailResponse } from 'types/Email'

type Contact = Record<'firstName' | 'lastName' | 'email' | 'phone' | 'message', string>

const regexp = {
	name: /^[a-zA-Z ]+$/,
	email:
		/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/,
	phone: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im,
	message: /[a-zA-Z]+/,
}

const validations: Validations<Contact> = {
	firstName: {
		required: 'Must enter your first name',
		pattern: {
			value: regexp.name,
			message: 'Please enter a valid name',
		},
	},
	lastName: {
		required: 'Must enter your last name',
		pattern: {
			value: regexp.name,
			message: 'Please enter a valid name',
		},
	},
	email: {
		required: 'Must enter your email address',
		pattern: {
			value: regexp.email,
			message: 'Please enter a valid email address',
		},
	},
	phone: {
		pattern: {
			value: regexp.phone,
			message: 'Please enter a valid phone number',
		},
	},
	message: {
		required: "Please enter a brief message of what you're inquiring on",
		pattern: {
			value: regexp.message,
			message: 'Please enter a valid message',
		},
	},
}

function ContactForm() {
	const { submitting, register, handleSubmit } = useForm<Contact>({
		validations,
		// sanitizeFn: DOMPurify.sanitize,
		onSubmit: async (data) => {
			console.log('submit', data)
			return Promise.resolve(true)
			// try {
			// 	return (await post<EmailResponse>('/contact', data)).data.success
			// } catch (err) {
			// 	console.error(err)
			// 	return false
			// }
		},
	})

	return (
		<div className="container max-w-sm sm:max-w-lg my-8 lg:my-0 bg-gray-50">
			<div className="form-container relative w-full rounded-xl shadow-lg bg-blackAlpha-600">
				<div
					className={[
						'form-overlay',
						'absolute',
						'h-full',
						'inset-0',
						'rounded-xl',
						'z-20',
						'bg-gray-900',
						'opacity-70',
						submitting ? 'centered' : 'hidden',
					].join(' ')}
				>
					<PulseSpinner />
				</div>

				<form
					onSubmit={handleSubmit}
					noValidate
					className="relative w-full p-4 sm:py-6 md:py-8 md:px-10"
				>
					<div className="pb-6 px-12 text-center">
						<span className="text-gray-600 font-semibold text-lg text-center">
							Enter your contact info and we will get back to as soon as possible!
						</span>
					</div>
					{/* {serverError && (
							<div className="mb-4 sm:mb-6 bg-red-500 py-4 rounded-md text-center">
								<h3 className="text2xl text-white">{serverError}</h3>
							</div>
						)} */}
					<div className="flex flex-col gap-2">
						<Input
							name="firstName"
							label="First name"
							required
							bg="bg-gray-50"
							{...register('firstName')}
						/>
						<Input
							name="lastName"
							label="Last name"
							required
							bg="bg-gray-50"
							{...register('lastName')}
						/>
						<Input
							name="email"
							label="Email address"
							required
							bg="bg-gray-50"
							{...register('email')}
						/>
						<Input name="phone" label="Phone number" bg="bg-gray-50" {...register('phone')} />
						<TextArea
							name="message"
							label="Message"
							height="h-48"
							required
							bg="bg-gray-50"
							{...register('message')}
						/>
					</div>

					<div className="py-4 mt-4">
						<button
							type="submit"
							className="w-full px-2 py-4 rounded-md text-white text-lg font-semibold uppercase bg-green-600 hover:bg-green-700"
						>
							Send message
						</button>
					</div>
				</form>
			</div>
		</div>
	)
}

export default ContactForm
