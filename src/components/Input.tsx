export type InputProps = {
	name: string
	label: string
	type?: 'text' | 'email' | 'password'
	placeholder?: boolean
	required?: boolean
	onChange?: (e: any) => void
	onBlur?: () => void
	error?: string
	bg?: string
}

export default function Input({
	name,
	label,
	type = 'text',
	placeholder,
	required = false,
	onChange,
	onBlur,
	error = '',
	bg,
}: InputProps) {
	return (
		<div className="text-input">
			<div className="relative mt-2 w-full">
				<input
					type={type}
					id={name}
					placeholder={(placeholder || label) + (required ? '*' : '')}
					onInput={onChange}
					onBlur={onBlur}
					className={[
						'peer',
						'block',
						'w-full',
						'appearance-none',
						'rounded-lg',
						'border',
						'border-1',
						Boolean(error) ? 'border-red-500' : 'border-gray-300',
						'bg-transparent',
						'px-2.5',
						'pb-2.5',
						'pt-4',
						'text-sm',
						'text-gray-900',
						Boolean(error) ? 'focus:border-red-500' : 'focus:border-green-600',
						'focus:outline-none',
						'focus:ring-0',
					].join(' ')}
				/>
				<label
					htmlFor={name}
					className={[
						'absolute',
						'top-2',
						'left-1',
						'z-10',
						'origin-[0]',
						'-translate-y-4',
						'scale-75',
						'transform',
						'cursor-text',
						'select-none',
						bg ? bg : 'bg-white',
						'px-2',
						'text-sm',
						Boolean(error) ? 'text-red-500' : 'text-gray-500',
						'duration-300',
						'peer-placeholder-shown:top-1/2',
						'peer-placeholder-shown:-translate-y-1/2',
						'peer-placeholder-shown:scale-100',
						'peer-focus:top-2',
						'peer-focus:-translate-y-4',
						'peer-focus:scale-75',
						'peer-focus:px-2',
						Boolean(error) ? 'focus:text-red-500' : 'peer-focus:text-green-600',
					].join(' ')}
				>
					{label + (required ? '*' : '')}
				</label>
			</div>

			{error && (
				<div className="ml-2">
					<span className="text-sm text-red-500">{error}</span>
				</div>
			)}
		</div>
	)
}
