import {
	type RESTPostAPIChatInputApplicationCommandsJSONBody,
	type APIApplicationCommandSubcommandGroupOption,
	type APIApplicationCommandSubcommandOption,
	type ApplicationCommandDataResolvable,
	type ClientOptions,
	type Interaction,
	Client,
} from "discord.js";
import { Registry } from "./Registry";
import type { Event } from "../loaders/EventLoader";
import type { Command } from "../loaders/CommandLoader";
import type { Button } from "../loaders/ButtonLoader";

export class VoidyClient extends Client {
	public registries: Registry[];
	public cache: { commands: Command[], buttons: Button[] } = {
		commands: [],
		buttons: [],
	};

	public constructor(options: ClientOptions) {
		super(options);

		this.registries = [
			new Registry(`${process.cwd()}/src/modules`),
		];
	}

	public async start(token: string) {
		// 1. Prepare commands and events, without registering them
		const {
			commands,
			commandsJSON,
			buttons,
			events
		} = await this.collectBundledRegistryData();

		// 1.1 Cache collected commands and buttons
		this.cache.commands = [...commands];
		this.cache.buttons = [...buttons];

		// 2. Register event listeners
		await this.registerEventHandlers(events);

		// 3. Log in
		await this.login(token);

		// 4. Register/Publish commands
		await this.registerCommands(commandsJSON);
	}

	private async collectBundledRegistryData() {
		for (const registry of this.registries) {
			// 1. Collecting required registry data
			console.info(`[Voidy] Collecting registry data: ${registry.dataSource}`);
			await registry.collect();

			// 2. Preparing collected registry data for activation
			console.info(`[Voidy] Preparing registry data: ${registry.dataSource}`);
			await registry.prepare();

			// 3. Activating registry
			console.info(`[Voidy] Activating registry: ${registry.dataSource}`);
			await registry.activate();
		}

		// Only get active registries
		const activeRegistries = this.registries
			.filter(registry => registry.active);

		// Collect events from active registries
		const events = activeRegistries
			.flatMap(registry => registry.events);

		// Collect raw commands from active registries
		const commands = activeRegistries
			.flatMap(registry => registry.commands)

		// Collect JSON export of commands from active registries
		const commandsJSON = activeRegistries
			.flatMap(registry => registry.commands)
			.flatMap(commands => commands.data.toJSON())

		// Collect raw buttons from active registries
		const buttons = activeRegistries
			.flatMap(registry => registry.buttons)

		return { commands, commandsJSON, buttons, events };
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
