import { ButtonLoader, type Button } from "../loaders/ButtonLoader"
import { CommandLoader, type Command } from "../loaders/CommandLoader"
import { EventLoader, type Event } from "../loaders/EventLoader"
import { ModuleLoader, type Module } from "../loaders/ModuleLoader"

export enum RegistryCacheKey {
	Events = "events",
	Modules = "modules",
	Buttons = "buttons",
	Commands = "commands",
}

export type RegistryCache = {
	events: Event[],
	modules: Module[],
	buttons: Button[],
	commands: Command[],
	[x: string]: object[],
};

export interface IRegistry {
	id: string
	active: boolean
	dataSource: string

	cache: RegistryCache;

	collectModules: () => Promise<void>
	processModules: () => Promise<void>

	activate: () => Promise<void>
	deactivate: () => Promise<void>
}

export class Registry implements IRegistry {
	public id: string;
	public active = false;
	public dataSource: string;

	// Initialize cache stores
	public cache: RegistryCache = {
		events: [],
		modules: [],
		buttons: [],
		commands: [],
	}

	public constructor(id: string, dataSource: string) {
		this.id = id;
		this.dataSource = dataSource;
	}

	/** Collect modules from specified dataSource directory */
	public async collectModules() {
		// Collect modules and bundle their JSON contents into an array.
		const moduleLoader = new ModuleLoader(this.dataSource);
		const modules = (await moduleLoader.collect()).getJSON();

		// Merge all modules into the store.
		this.cache.modules = modules;
	}

	/** Process exports of all collected modules */
	public async processModules() {
		for (const module of this.cache.modules) {
			for (const item of module.exports) {
				const loader = new item.loader(item.source);
				await loader.collect();

				// Mape loader output to correct cache key
				this.cache[`${loader.id}s`] = [...loader.getJSON()];
			}
		}
	}

	public async activate() {
		this.active = true;
	}

	public async deactivate() {
		this.active = false;
	}
}
