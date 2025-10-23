import { MessageFlags, SlashCommandSubcommandBuilder } from "discord.js";
import type { Command } from "voidy-framework";

export default {
	id: "api.httpcat",
	data: new SlashCommandSubcommandBuilder()
		.setName("httpcat")
		.setDescription("Display a cat from the https://http.cat API.")
		.addStringOption(option => option
			.setName("code")
			.setDescription("The desired HTTP status code.")
			.setRequired(true)
		)
		.addBooleanOption(option => option
			.setName("ephemeral")
			.setDescription("Whether to publicly share the bot response")
		),

	execute: async (interaction, _client) => {
		const { options } = interaction;

		const httpCode = options.getString("code");
		const ephemeral = options.getBoolean("ephemeral") ?? true;

		await interaction.reply({
			files: [`https://http.cat/${httpCode}.jpg`],
			flags: ephemeral ? [MessageFlags.Ephemeral] : []
		});
	}
} as Command
