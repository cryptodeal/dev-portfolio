export function random(...args: any[]): any {
	const isArray = Array.isArray(args[0]);
	if (isArray) {
		const targetArray = args[0];
		return targetArray[random(0, targetArray.length - 1, true)];
	} else {
		const min = args[0];
		const max = args[1];
		const clamp = args[2] || false;

		const val = Math.random() * (max - min) + min;

		return clamp ? Math.round(val) : val;
	}
}
