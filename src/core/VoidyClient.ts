import {
	type RESTPostAPIChatInputApplicationCommandsJSONBody,
	type APIApplicationCommandSubcommandGroupOption,
	type APIApplicationCommandSubcommandOption,
	type ApplicationCommandDataResolvable,
	type ClientOptions,
	Client,
} from "discord.js";
import { Registry } from "./Registry";
import { RegistryManager } from "./RegistryManager";
import type { Event } from "../loaders/EventLoader";

export class VoidyClient extends Client {
	public registryManager = new RegistryManager();

	public constructor(options: ClientOptions) {
		super(options);

		// Add the core registry to our registry manager
		this.registryManager.addRegistry(
			new Registry('core', `${process.cwd()}/src/modules`)
		);
	}

	public async start(token: string) {
		// 1. Prepare and fetch registry manager cache
		await this.registryManager.prepareRegistries();
		const cache = this.registryManager.getCache();

		// 2. Showcase all loaded entities based on cache contents
		for (const [key, value] of Object.entries(cache)) {
			console.log(`[Voidy] Loaded ${value.length} ${key[0]?.toUpperCase() + key.substring(1)}`);
		}

		// 3. Register event listeners
		await this.registerEventHandlers(cache.events);

		// 4. Log in
		await this.login(token);

		// 5. Register/Publish commands
		await this.registerCommands(cache.commands.flatMap(command => command.data.toJSON()));
	}

	private async registerEventHandlers(events: Event[]) {
		console.log(`[Voidy] Registering ${events.length} event listeners: ${events.map(event => event.name).join(", ")}`);

		for (const event of events) {
			const execute = (...args: unknown[]) => event.execute(this, ...args);

			if (event.once) this.once(event.name, execute);
			else this.on(event.name, execute);
		}
	}

	// @Todo: fix this type mess, if possible
	private async registerCommands(commands: (RESTPostAPIChatInputApplicationCommandsJSONBody | APIApplicationCommandSubcommandOption | APIApplicationCommandSubcommandGroupOption)[]) {
		console.info(`[Voidy] Registering ${commands.length} commands: ${commands.map(command => command.name).join(", ")}`);

		await this.application?.commands.set(commands as ApplicationCommandDataResolvable[]);
	}
}
