/**
 * Debounces or throttles a function. Any new calls to the function will reset
 * the timer and the function will be called after the timer has elapsed.
 */
export default (func: (...args: any) => void, timeout = 10) => {
	let timer = 0
	let time = Date.now()

	return (...args: any) => {
		if (timer) clearTimeout(timer)
		time = Date.now()

		timer = setTimeout(() => {
			if (Date.now() - time > timeout) {
				func.apply(this, args)
			}
		}, timeout)
	}
}
