import { CommandLoader, type Command } from "../loaders/CommandLoader"
import { EventLoader, type Event } from "../loaders/EventLoader"
import { ModuleLoader, type Module } from "../loaders/ModuleLoader"

export interface IRegistry {
	dataSource: string
	modules: Module[]
	commands: Command[]
	events: Event[]
	active: boolean

	collect: () => Promise<void>
	prepare: () => Promise<void>
	activate: () => Promise<void>
	unload: () => Promise<void>
}

export class Registry implements IRegistry {
	public dataSource: string;
	public modules: Module[] = [];
	public commands: Command[] = [];
	public events: Event[] = [];
	public active = false;

	public constructor(dataSource: string) {
		this.dataSource = dataSource;
	}

	public async collect() {
		// Collect modules and bundle their JSON contents into an array.
		const moduleLoader = new ModuleLoader(this.dataSource);
		const modules = (await moduleLoader.collect()).getJSON();

		// Merge all modules into the store.
		this.modules = this.modules.concat(modules);
	}

	public async prepare() {
		for (const module of this.modules) {
			for (const item of module.exports) {
				const loader = new item.loader(item.source);
				await loader.collect();

				if (loader instanceof CommandLoader) {
					this.commands.push(...loader.getJSON());
				} else if (loader instanceof EventLoader) {
					this.events.push(...loader.getJSON());
				}
			}
		}
	}

	public async activate() {
		this.active = true;
	}

	public async unload() { }
}
