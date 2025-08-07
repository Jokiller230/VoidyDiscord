import { Glob } from "bun";

interface ILoader<T> {
	dataSource: string
	store: T[]

	collect: () => Promise<ThisType<this>>
	validate: (data: Partial<T>) => Promise<T | null>
	getJSON: () => T[]
}

export class Loader<T extends object> implements ILoader<T> {
	public dataSource;
	public store: T[] = [];

	public constructor(dataSource: string) {
		if (!dataSource) throw new Error("Class of type Loader was initialized without the *required* dataSource parameter.");

		this.dataSource = dataSource;
	}

	/**
	* Recursively collects data from a directory based on the path specificed in dataSource property.
	*/
	public async collect() {
		const glob = new Glob(`**/**.ts`);
		const iterator = glob.scan(this.dataSource);

		for await (const path of iterator) {
			let moduleDefault: T | null;

			try {
				const module = (await import(`${this.dataSource}/${path}`));
				moduleDefault = module.default;

				if (!moduleDefault) continue;
			} catch {
				continue;
			}

			const final = await this.validate(moduleDefault);
			if (!final) continue;

			this.store.push(final);
		}

		return this;
	}

	/**
 * Validates a singular element during data collection, and returns whatever should be written to the store.
 */
	public async validate(data: Partial<T>): Promise<T | null> {
		return null;
	}

	public getJSON() {
		return this.store;
	}
};
