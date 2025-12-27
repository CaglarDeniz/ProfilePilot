export async function wait(ms: number): Promise<void> {
	return new Promise((resolve) => setTimeout(resolve, ms))
}

export function gaussianRandom(mean: number, stddev: number): number {
	let u1 = Math.random();
	let u2 = Math.random();

	// Box-Muller transform
	let z0 = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);

	// Return the result, scaled by the desired mean (mu) and standard deviation (sigma)
	return mean + stddev * z0;
}

export function discreteUniformRandom(min: number, max: number): number {
	return Math.floor(Math.min(min + Math.random() * (max - min)))
}

export function bernoulliTrials(p: number, n: number): number[] {
	// Validate that p is between 0 and 1
	if (p < 0 || p > 1) {
		throw new Error("Probability p must be between 0 and 1.");
	}

	// Create an array to store the results of the trials
	const trials: number[] = [];

	// Perform n trials
	for (let i = 0; i < n; i++) {
		// Generate a random number between 0 and 1, if it's less than p, it's a success (1)
		trials.push(Math.random() < p ? 1 : 0);
	}

	return trials;
}

export function isUpperCase(char : string){
	if(char.length != 1){
		throw new Error("String must only contain a single character")
	}

	return char.toUpperCase() === char
}

export function isLowerCase(char : string){
	if(char.length != 1){
		throw new Error("String must only contain a single character")
	}

	return char.toLowerCase() === char
}
