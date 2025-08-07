import {
	type RESTPostAPIChatInputApplicationCommandsJSONBody,
	type APIApplicationCommandSubcommandGroupOption,
	type APIApplicationCommandSubcommandOption,
	type ApplicationCommandDataResolvable,
	type ClientOptions,
	Client,
} from "discord.js";
import { Registry } from "./Registry";
import type { Event } from "../loaders/EventLoader";

export class VoidyClient extends Client {
	public registries: Registry[];

	public constructor(options: ClientOptions) {
		super(options);

		this.registries = [
			new Registry(`${process.cwd()}/src/modules`),
		];
	}

	public async start(token: string) {
		await this.login(token);
		await this.initialize();
	}

	private async initialize() {
		for (const registry of this.registries) {
			await registry.collect();
			await registry.prepare();
			await registry.activate();
		}

		const activeRegistries = this.registries
			.filter(registry => registry.active);

		const allEvents = activeRegistries
			.flatMap(registry => registry.events);

		const allCommands = activeRegistries
			.flatMap(registry => registry.commands)
			.flatMap(commands => commands.data.toJSON())

		await this.registerEventHandlers(allEvents);
		await this.registerCommands(allCommands);
	}

	private async registerEventHandlers(events: Event[]) {
		for (const event of events) {
			const execute = (...args: unknown[]) => event.execute(this, ...args);

			if (event.once) this.once(event.name, execute);
			else this.on(event.name, execute);
		}
	}

	// @Todo: fix this type mess, if possible
	private async registerCommands(commands: (RESTPostAPIChatInputApplicationCommandsJSONBody | APIApplicationCommandSubcommandOption | APIApplicationCommandSubcommandGroupOption)[]) {
		await this.application?.commands.set(commands as ApplicationCommandDataResolvable[]);
	}
}
