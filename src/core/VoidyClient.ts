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
import { Lifecycle, LifecycleEvents } from "./Lifecycle";

export class VoidyClient extends Client {
	public registryManager = new RegistryManager();
	private intervalID?: NodeJS.Timeout | NodeJS.Timer;

	public constructor(options: ClientOptions) {
		super(options);

		// Add the core registry to our registry manager
		this.registryManager.addRegistry(
			new Registry('core', `${process.cwd()}/src/modules`)
		);
	}

	/**
		* Register all provided events
		* @param events
	*/
	private async registerEventHandlers(events: Event[]) {
		console.log(`[Voidy] Registering ${events.length} event listeners: ${events.map(event => event.name).join(", ")}`);

		for (const event of events) {
			const execute = (...args: unknown[]) => event.execute(this, ...args);

			if (event.once) this.once(event.name, execute);
			else this.on(event.name, execute);
		}
	}

	/**
		* Register all provided commands to the global discord context
		* @param commands
		* @todo Fix this type mess, if possible
	*/
	private async registerCommands(commands: (RESTPostAPIChatInputApplicationCommandsJSONBody | APIApplicationCommandSubcommandOption | APIApplicationCommandSubcommandGroupOption)[]): Promise<void> {
		console.info(`[Voidy] Registering ${commands.length} commands: ${commands.map(command => command.name).join(", ")}`);

		await this.application?.commands.set(commands as ApplicationCommandDataResolvable[]);
	}

	/**
		* Refresh the registry manager and re-register relevant data
		* @param token
	*/
	private async refresh() {
		// 1. Prepare and fetch registry manager cache
		await this.registryManager.prepareRegistries();
		const cache = this.registryManager.getCache();

		let cacheSize = 0;
		for (const cacheValue of Object.values(cache)) {
			cacheSize += cacheValue.length;
		}

		// 2. Showcase number of loaded cache entities
		console.log(`[Voidy] Refreshed RegistryManager cache, with a total of ${cacheSize} items.`);

		// 3. Clear and re-register events
		const events = cache.events;
		this.removeAllListeners();
		this.registerEventHandlers(events);

		// 4. Register all active commands
		const commands = cache.commands.flatMap(command => command.data.toJSON());
		this.registerCommands(commands);
	}

	/**
		* Runs reccurring tasks, doesn't loop by itself, though
	*/
	private async loop() {
		// Notifies the "client_loop" lifecycle event
		Lifecycle.notify(LifecycleEvents.ClientLoop);
	}

	/**
		* Starts the client loop, with a customizable interval
		* @param interval
	*/
	public startLoop(interval: number = 60 * 1000) {
		this.intervalID = setInterval(this.loop.bind(this), interval);
	}

	/**
		* Stops the client loop
	*/
	public stopLoop() {
		if (!this.intervalID) return;
		clearInterval(this.intervalID);
	}

	/**
		* Launch the bot, additionally starts the client loop
		* @param token
	*/
	public async start(token: string) {
		await this.refresh();
		await this.login(token);

		this.startLoop();
	}
}
