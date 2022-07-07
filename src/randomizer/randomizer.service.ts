import { 
	Injectable,
	Logger,
} from '@nestjs/common';

import { GeneratorService } from './generator/generator.service';

@Injectable()
export class RandomizerService extends GeneratorService {
	logger = new Logger(RandomizerService.name); // <-- not private cause of inheritance;

	constructor() {
		super();
	}

	public fisherYatesShuffle(arrayOfAnything: any[]): any[] {
		const newArray = [...arrayOfAnything];
		const arrayLength = newArray.length;
		
		for (let i = 0; i < arrayLength; i++) {
			const randomIndex = i + (this.generate(arrayLength - i));

			[newArray[i], newArray[randomIndex]] = 
			[newArray[randomIndex], newArray[i]];
		}

		return newArray;
	}

	/**
	 * Generate a random whole number using a min-max range.
	 * @param min default 0
	 * @param max default 100
	 * @returns number
	 */
	public wholeNumber(min: number = 0, max: number = 100): number {
		return this.generate(max - min) + min;
	}
}
