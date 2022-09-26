import { useState } from 'preact/hooks'

export default function MobileMenu({ routes, path }) {
	const [toggled, setToggled] = useState(false)

	return (
		<div class="mobile overflow-hidden">
			<div class="centered">
				<button class="w-full" onClick={() => setToggled((t) => !t)}>
					{!toggled.value ? (
						<svg width="32" height="32" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
							<path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" />
						</svg>
					) : (
						<svg width="32" height="32" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
							<path d="M376.6 84.5c11.3-13.6 9.5-33.8-4.1-45.1s-33.8-9.5-45.1 4.1L192 206 56.6 43.5C45.3 29.9 25.1 28.1 11.5 39.4S-3.9 70.9 7.4 84.5L150.3 256 7.4 427.5c-11.3 13.6-9.5 33.8 4.1 45.1s33.8 9.5 45.1-4.1L192 306 327.4 468.5c11.3 13.6 31.5 15.4 45.1 4.1s15.4-31.5 4.1-45.1L233.7 256 376.6 84.5z" />
						</svg>
					)}
				</button>
			</div>

			<div
				class={[
					'absolute',
					'h-[calc(100vh-248px)]',
					'md:h-[calc(100vh-200px)]',
					'w-full',
					'bg-white',
					'left-0',
					'top-[248px]',
					'md:top-[200px]',
					'z-10',
					'transition-transform',
					'duration-200',
					'ease-in-out',
					'overflow-y-scroll',
					toggled ? 'translate-x-0' : '-translate-x-full',
				].join(' ')}
			>
				<nav class="flex justify-center py-4 md:py-0">
					<ul class="flex flex-col justify-center gap-8">
						{routes.map((route) => (
							<li class="flex w-full text-center">
								<a
									href={route.path}
									class={[
										'py-2',
										'px-6',
										'w-full',
										'text-lg',
										'font-bold',
										'text-gray-600',
										'border-b-4',
										'border-b-transparent',
										path === route.path ? 'border-b-green-600' : '',
									].join(' ')}
								>
									{route.name}
								</a>
							</li>
						))}
					</ul>
				</nav>
			</div>
		</div>
	)
}
