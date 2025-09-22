//===============================================
//  Imports
//===============================================
import type { Module } from "../core/types/Module";
import { Loader } from "../core/Loader"

//===============================================
//  ModuleLoader Implementation
//===============================================
export class ModuleLoader extends Loader<Module> {
	public id = "module";
	public async validate(data: Partial<Module>) {
		if (
			!data.id ||
			!data.name ||
			!data.description ||
			!data.author ||
			!data.exports
		) return null;

		return data as Module;
	}
}
