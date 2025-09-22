import { MessageFlags, SlashCommandSubcommandBuilder } from "discord.js";
import type { Command } from "voidy-framework";

export default {
	id: "api.httpcat",
	data: new SlashCommandSubcommandBuilder()
		.setName("httpcat")
		.setDescription("Fetch a cat from the https://http.cat API.")
		.addStringOption(option => option
			.setName("code")
			.setDescription("The desirect HTTP status code.")
			.setRequired(true)
		),

	execute: async (interaction, client) => {
		const { options } = interaction;

		const httpCode = options.getString("code");

		await interaction.reply({
			files: [`https://http.cat/${httpCode}.jpg`],
			flags: [MessageFlags.Ephemeral]
		});
	}
} as Command
