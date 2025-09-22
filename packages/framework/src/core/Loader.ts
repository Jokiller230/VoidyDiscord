//===============================================
//  Imports
//===============================================
import { Glob } from "bun";

//===============================================
//  Loader Definition
//===============================================
interface ILoader<T extends object> {
	id: string
	cache: T[]
	source: string

	collect: () => Promise<ThisType<this>>
	validate: (data: Partial<T>) => Promise<T | null>
	getJSON: () => T[]
}

//===============================================
//  Loader Implementation
//===============================================
export abstract class Loader<T extends object> implements ILoader<T> {
	public abstract id: string;
	public cache: T[] = [];
	public source: string;

	public constructor(source: string) {
		if (!source) throw new Error("Class of type Loader was initialized without the *required* source parameter.");

		this.source = source;
	}

	/**
	* Recursively collects data from a directory based on the path specificed in dataSource property.
	*/
	public async collect() {
		const glob = new Glob(`**/**.ts`);
		const iterator = glob.scan(this.source);

		try {
			for await (const path of iterator) {
				let moduleDefault: T | null;

				try {
					const module = (await import(`${this.source}/${path}`));
					moduleDefault = module.default;

					if (!moduleDefault) continue;
				} catch {
					continue;
				}

				const final = await this.validate(moduleDefault);
				if (!final) continue;

				this.cache.push(final);
			}
		} catch {
			console.error(`[Voidy] Specified loader target ${this.source} doesn't exist. Skipping...`);
			return this;
		}

		return this;
	}

	/**
		* Validates a singular element during data collection, and returns whatever should be written to the cache.
	*/
	public abstract validate(data: Partial<T>): Promise<T | null>;

	/**
		* Returns the JSON-ified contents of the loader cache
	*/
	public getJSON() {
		return this.cache;
	}
};
