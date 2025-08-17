import type { ChatInputCommandInteraction } from "discord.js";
import { Handler } from "../core/Handler";
import type { Command } from "../loaders/CommandLoader";
import type { VoidyClient } from "../core/VoidyClient";

export class CommandHandler extends Handler<Command> {
	public constructor(
		client: VoidyClient
	) {
		super(client);
	}

	public invoke(data: ChatInputCommandInteraction): void {
		console.log(data);
		// @Todo: implement invoke method, which fetches command information from registries, based on the command name
		// 
		// @Todo: consider whether we actually need handlers as separate classes, or if we can just give the client a handle method.
	}
}
