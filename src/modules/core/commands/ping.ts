import { MessageFlags, SlashCommandBuilder } from "discord.js";
import type { Command } from "../../../loaders/CommandLoader";

export default {
	data: new SlashCommandBuilder()
		.setName("ping")
		.setDescription("View the websocket ping between Discord and the Bot.")
		.addSubcommand(subcommand => subcommand
			.setName("balls")
			.setDescription("A required description")
		),

	execute: async (interaction, client) => {
		await interaction.reply({
			content: `The current websocket ping is at ${client.ws.ping}`,
			flags: [MessageFlags.Ephemeral]
		});
	}
} as Command
