import { ModuleLoader, type Module } from "../loaders/ModuleLoader"

export interface IRegistry {
	dataSource: string
	store: Module[]

	collect: () => Promise<void>
	prepare: () => Promise<void>
	activate: () => Promise<void>
	unload: () => Promise<void>
}

export class Registry implements IRegistry {
	public dataSource: string;
	public store: Module[] = [];

	public constructor(dataSource: string) {
		this.dataSource = dataSource;
	}

	// @Todo: finish this implementation
	public async collect() {
		const moduleLoader = await (new ModuleLoader(this.dataSource)).collect();
		console.log(moduleLoader.getJSON()[0]?.exports);
	}

	public async prepare() { }

	public async activate() { }

	public async unload() { }
}
