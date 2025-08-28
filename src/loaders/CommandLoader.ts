import type {
	ChatInputCommandInteraction,
	SlashCommandBuilder, SlashCommandSubcommandBuilder, SlashCommandSubcommandGroupBuilder
} from "discord.js";
import { Loader } from "../core/Loader";
import type { VoidyClient } from "../core/VoidyClient";

export interface Command {
	data: SlashCommandBuilder | SlashCommandSubcommandBuilder | SlashCommandSubcommandGroupBuilder,
	execute: (
		interaction: ChatInputCommandInteraction, client: VoidyClient
	) => Promise<void>
}

export class CommandLoader extends Loader<Command> {
	public override id = "command";
	public override async validate(data: Partial<Command>) {
		if (!data.data || !data.execute) return null;
		return data as Command;
	}
}
