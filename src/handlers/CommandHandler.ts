import type { ChatInputCommandInteraction } from "discord.js";
import type { Command } from "../loaders/CommandLoader";
import type { VoidyClient } from "../core/VoidyClient";

export class ChatInputCommandHandler {
	public static invoke(interaction: ChatInputCommandInteraction, payload: Command, client: VoidyClient): void {
		payload.execute(interaction, client);
	}
}
