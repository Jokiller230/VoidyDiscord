//===============================================
//  Imports
//===============================================
import type {
	SlashCommandSubcommandGroupBuilder,
	SlashCommandSubcommandBuilder,
	ChatInputCommandInteraction,
	SlashCommandBuilder,
} from "discord.js";
import type { VoidyClient } from "../VoidyClient";
import type { Resource } from "./Resource";

//===============================================
//  Command Definition
//===============================================
export interface Command extends Resource {
	data: SlashCommandBuilder | SlashCommandSubcommandBuilder | SlashCommandSubcommandGroupBuilder,
	execute: (
		interaction: ChatInputCommandInteraction, client: VoidyClient
	) => Promise<void>
}
