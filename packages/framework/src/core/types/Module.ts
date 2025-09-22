//===============================================
//  Imports
//===============================================
import type { Resource } from "./Resource";
import type { Loader } from "../Loader";

//===============================================
//  ModuleExportsItem Definition
//===============================================
export interface ModuleExportsItem<T extends object> {
	source: string
	loader: new (...args: ConstructorParameters<typeof Loader<T>>) => Loader<T>
}

//===============================================
//  Module Definition
//===============================================
export interface Module extends Resource {
	name: string
	description: string
	author: string
	exports: ModuleExportsItem<object>[]
}
