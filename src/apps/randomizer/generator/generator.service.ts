import { Injectable, Logger } from '@nestjs/common';

import { exec } from 'child_process';
import * as Fortuna from 'javascript-fortuna';
import { sha512 } from 'js-sha512';
import { promisify } from 'util';

const promiseExec = promisify(exec);

export const DEV_URANDOM_STRING_RANDOMIZE_COMMAND = 'xxd -l128 -ps /dev/urandom | xxd -r -ps | base64 | tr -d = | tr + - | tr / _';
export const MAX_32BIT_INTEGER = 2**32;

/**
 * This service is made with the intention of making it permanent
 */
@Injectable()
export class GeneratorService {
	private _entropyKey: string = '';

	logger = new Logger(GeneratorService.name);

	constructor() {
		this.generateEntropyKeyUsingDevUrandom()
		.then(() => { this.initFortuna(); })
		.catch((err) => { throw new Error(err.message); });
	}
	
	set entropyKey(value: string) {
		this._entropyKey = value;
	}

	private initFortuna(): void {
		Fortuna.init({
			timeBasedEntropy: false,
			accumulateTimeout: 0,
			entropyFxn: this.getEntropyKey.bind(this),
		});
	}

	public getEntropyKey(): string {
		return this._entropyKey;
	}

	public generateEntropyKeyUsingDevUrandom(): Promise<void> {
		return new Promise(async (resolve, reject) => {
			const { stdout, stderr } = await promiseExec(
				DEV_URANDOM_STRING_RANDOMIZE_COMMAND
			);

			if (stderr) {
				reject(stderr);
			}
			
			const encryptedKey = sha512(stdout);
			this.entropyKey = encryptedKey;
			this.logger.debug(`Entropy key: ${encryptedKey}`);
			resolve(encryptedKey);
		});
	}

	public generate(range: number): number {
		const max = Math.floor(MAX_32BIT_INTEGER / range) * range;
		let x: number;

		do {
			x = Math.floor(Fortuna.random() * MAX_32BIT_INTEGER);
		} while(x >= max)

		return x % range;
	}
}
