//===============================================
//  Imports
//===============================================
import {
	type ClientOptions,
	SlashCommandSubcommandGroupBuilder,
	SlashCommandSubcommandBuilder,
	SlashCommandBuilder,
	Client,
} from "discord.js";
import { ModuleManager, type CacheMap } from "./ModuleManager";
import type { Command } from "./types/Command";
import type { Button } from "./types/Button";
import type { Event } from "./types/Event";

//===============================================
//  VoidyClient Implementation
//===============================================
export class VoidyClient extends Client {
	public moduleManager = new ModuleManager();

	public constructor(options: ClientOptions) {
		super(options);
	}

	/**
		* Launches the bot
		* @param token - The Discord application bot token.
		* @param modulesPath - Where the bot should search for modules.
	*/
	public async start(token: string, modulesPath: string) {
		// Load modules and register events
		await this.moduleManager.loadModules(modulesPath);
		await this.registerEvents();

		// Register commands on ready event
		this.on("ready", this.registerCommands);

		// Login using the bot token
		await this.login(token);
	}

	/**
		* Registers all cached events
		* @param events
	*/
	private async registerEvents() {
		const events = this.moduleManager.events;

		for (const [_id, event] of events) {
			const execute = (...args: unknown[]) => event.execute(this, ...args);

			if (event.once) this.once(event.name, execute);
			else this.on(event.name, execute);
		}
	}

	/**
		* Registers all provided commands globally
		* @param commands
	*/
	private async registerCommands(): Promise<void> {
		const topLevelCommands = new Map<string, SlashCommandBuilder>();

		for (const cmd of this.moduleManager.commands.values()) {
			const parts = cmd.id.split("."); // ["music", "set", "channel"]
			const command = parts[0];
			const subcommand = parts[1];
			const subgroupcommand = parts[2];

			if (!command) continue;

			// Ensure top-level builder exists
			if (!topLevelCommands.has(command)) {
				const topCommand = (
					this.moduleManager.commands.get(command)?.data as SlashCommandBuilder
				) ?? new SlashCommandBuilder().setName(command).setDescription("...");

				topLevelCommands.set(command, topCommand);
			}

			const parent = topLevelCommands.get(command)!;

			if (subcommand && !subgroupcommand) {
				// It's a subcommand
				parent.addSubcommand(cmd.data as SlashCommandSubcommandBuilder);
			} else if (subcommand && subgroupcommand) {
				// It's a subgroup command
				let group = parent.options.find(
					(o): o is SlashCommandSubcommandGroupBuilder => o instanceof SlashCommandSubcommandGroupBuilder && o.name === subcommand
				);

				if (!group) {
					group = new SlashCommandSubcommandGroupBuilder().setName(subcommand).setDescription("...");
					parent.addSubcommandGroup(group);
				}

				group.addSubcommand(cmd.data as SlashCommandSubcommandBuilder);
			}
		}

		// Finally convert assembled top-level commands to JSON and register them
		await this.application?.commands.set([...topLevelCommands.values()].map(c => c.toJSON()));
	}

	/**
	 * Returns all cached commands
	 */
	get commands(): CacheMap<Command> {
		return this.moduleManager.commands;
	}

	/**
	 * Returns all cached events
	 */
	get events(): CacheMap<Event> {
		return this.moduleManager.events;
	}

	/**
	 * Returns all cached buttons
	 */
	get buttons(): CacheMap<Button> {
		return this.moduleManager.buttons;
	}
}
