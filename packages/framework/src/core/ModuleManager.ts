//===============================================
//  Imports
//===============================================
import { ModuleLoader } from "../loaders/ModuleLoader";
import type { Command } from "./types/Command";
import type { Button } from "./types/Button";
import type { Module } from "./types/Module";
import type { Event } from "./types/Event";

export type CacheMap<T = unknown> = Map<string, T>;

//===============================================
//  ModuleManager Implementation
//===============================================
export class ModuleManager {
	private cache = new Map<string, Map<string, unknown>>();

	//  Module Loading
	//==============================
	async loadModules(path: string) {
		const moduleLoader = new ModuleLoader(path);
		const modules = (await moduleLoader.collect()).getJSON();

		for (const module of modules) {
			await this.prepareModule(module);
		}
	}

	async prepareModule(module: Module) {
		for (const exp of module.exports) {
			const loader = new exp.loader(exp.source);
			const data = (await loader.collect()).getJSON();

			for (const item of data) {
				this.set(loader.id, (item as any).id, item);
			}
		}
	}

	//  Core API
	//==============================
	set<T>(type: string, id: string, value: T) {
		if (!this.cache.has(type)) this.cache.set(type, new Map());
		(this.cache.get(type) as CacheMap<T>).set(id, value);
	}

	get<T>(type: string, id: string): T | undefined {
		return (this.cache.get(type) as CacheMap<T>)?.get(id);
	}

	getAll<T>(type: string): CacheMap<T> {
		return (this.cache.get(type) as CacheMap<T>) ?? new Map();
	}

	//  Typed Accessors
	//==============================
	get modules(): CacheMap<Module> {
		return this.getAll<Module>("module");
	}

	get commands(): CacheMap<Command> {
		return this.getAll<Command>("command");
	}

	get buttons(): CacheMap<Button> {
		return this.getAll<Button>("button");
	}

	get events(): CacheMap<Event> {
		return this.getAll<Event>("event");
	}
}
