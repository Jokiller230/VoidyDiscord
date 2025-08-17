import { Events, type Interaction } from "discord.js";
import type { Event } from "../../../loaders/EventLoader";
import type { VoidyClient } from "../../../core/VoidyClient";
import { CommandHandler } from "../../../handlers/CommandHandler";

export default {
	name: Events.InteractionCreate,
	execute: async (client: VoidyClient, interaction: Interaction) => {
		if (!interaction.isChatInputCommand() || !interaction.isCommand()) return null;

		console.log(interaction.commandName);
		
		
	}
} as Event
