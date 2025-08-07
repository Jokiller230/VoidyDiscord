import { Loader } from "../core/Loader"

export interface ModuleExportsItem<T extends object> {
	source: string
	loader: typeof Loader<T>
}

export interface Module {
	name: string
	description: string
	author: string
	exports: ModuleExportsItem<object>[]
}

export class ModuleLoader extends Loader<Module> {
	public override async validate(data: Partial<Module>) {
		if (
			!data.name ||
			!data.description ||
			!data.author ||
			!data.exports
		) return null;

		return data as Module;
	}
}
