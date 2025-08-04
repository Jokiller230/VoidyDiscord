import type { Module } from "../loaders/ModuleLoader"

export interface IRegistry {
	store: Module[]

	collect: () => Promise<void>
	prepare: () => Promise<void>
	activate: () => Promise<void>
	unload: () => Promise<void>
}

export class Registry implements IRegistry {
	public store: Module[] = [];

	public async collect() { }

	public async prepare() { }

	public async activate() { }

	public async unload() { }
}
