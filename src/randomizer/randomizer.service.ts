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
}
