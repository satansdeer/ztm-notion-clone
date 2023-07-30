type ArgumentTypes<F extends Function> = F extends (...args: infer A) => any
	? A
	: never;

export function debounce<TCallback extends Function>(
	callback: TCallback,
	delay = 300
) {
	let timeoutId: ReturnType<typeof setTimeout>;
	return function (...args: ArgumentTypes<TCallback>) {
		clearTimeout(timeoutId);
		timeoutId = setTimeout(() => callback(...args), delay);
	};
}
