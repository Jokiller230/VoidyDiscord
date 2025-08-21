import { Events, MessageFlags, type Interaction } from "discord.js";
import type { Event } from "../../../loaders/EventLoader";
import type { VoidyClient } from "../../../core/VoidyClient";
import { ChatInputCommandHandler } from "../../../handlers/CommandHandler";
import { ButtonHandler } from "../../../handlers/ButtonHandler";

export default {
	name: Events.InteractionCreate,
	execute: async (client: VoidyClient, interaction: Interaction) => {
		if (interaction.isChatInputCommand() && interaction.isCommand()) {
			// Filter the client command cache to locate the invoked command
			const payload = client.cache.commands.filter(commands => commands.data.name === interaction.commandName)[0];

			if (!payload) return interaction.reply({
				content: `Sorry, but the command ${interaction.commandName} could not be located in my command cache >:3`,
				flags: [MessageFlags.Ephemeral]
			});

			ChatInputCommandHandler.invoke(interaction, payload, client);
		} else if (interaction.isButton()) {
			// Filter the client button cache to locate the invoked button
			const payload = client.cache.buttons.filter(buttons => buttons.id === interaction.customId)[0];

			if (!payload) return interaction.reply({
				content: `Sorry, but the button ${interaction.customId} could not be located in my button cache >:3`,
				flags: [MessageFlags.Ephemeral]
			});

			ButtonHandler.invoke(interaction, payload, client);
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
