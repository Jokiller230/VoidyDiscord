import { Events, MessageFlags, type Interaction } from "discord.js";
import {
	ChatInputCommandHandler,
	ButtonHandler,
	type VoidyClient,
	type Event
} from "voidy-framework";

export default {
	id: "interactionCreate",
	name: Events.InteractionCreate,
	execute: async (client: VoidyClient, interaction: Interaction) => {
		if (interaction.isChatInputCommand() && interaction.isCommand()) {
			// Set the top-level command name
			let commandId = interaction.commandName;

			// Try to get a subgroup first
			const subgroup = interaction.options.getSubcommandGroup(false);
			if (subgroup) commandId += `.${subgroup}`;

			// Then subcommand (or subcommand in a group)
			const subcommand = interaction.options.getSubcommand(false);
			if (subcommand) commandId += `.${subcommand}`;

			const command = client.commands.get(commandId);

			if (!command) return interaction.reply({
				content: `Sorry, but the command ${interaction.commandName} could not be located in my command cache >:3`,
				flags: [MessageFlags.Ephemeral]
			});

			ChatInputCommandHandler.invoke(interaction, command, client);
		} else if (interaction.isButton()) {
			// Filter the client button cache to locate the invoked button
			const button = client.buttons.get(interaction.customId);

			if (!button) return interaction.reply({
				content: `Sorry, but the button ${interaction.customId} could not be located in my button cache >:3`,
				flags: [MessageFlags.Ephemeral]
			});

			ButtonHandler.invoke(interaction, button, client);
		} else {
			let dmChannel = interaction.user.dmChannel;

			// Attempt DM channel creation, if not found.
			if (!dmChannel) {
				dmChannel = await interaction.user.createDM();
			}

			// If the DM channel is still not available, give up.
			if (!dmChannel || !dmChannel.isSendable()) return;

			dmChannel.send({
				content: `Sorry, but your last interaction wasn't successful and has been logged as an error case, for debugging purposes.\n\nIf you have any additional information to share with us, please communicate with the bot within this DM channel, and we will get in contact.\n\nThank you for understanding, and have a great day :3`,
			})
		}
	}
} as Event
