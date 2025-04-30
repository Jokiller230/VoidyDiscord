import {
  ButtonBuilder,
  ButtonStyle,
  CommandInteraction,
  ContainerBuilder,
  MessageFlags,
  SectionBuilder,
  SlashCommandBuilder,
  TextDisplayBuilder,
} from "discord.js";
import type { Command, FeatureContext } from "../../core/types.ts";

export const pingCommand: Command = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Replies with Pong and a Refresh button"),

  execute: async (interaction: CommandInteraction, context: FeatureContext) => {
    const button = new ButtonBuilder()
      .setCustomId(context.createCustomId("refresh"))
      .setLabel("🔁 Refresh")
      .setStyle(ButtonStyle.Primary);

    const headerTitle = new TextDisplayBuilder()
      .setContent(`🏓 Pong! ${context.client.ws.ping}ms`);

    const headerSection = new SectionBuilder()
      .addTextDisplayComponents([headerTitle])
      .setButtonAccessory(button);

    const container = new ContainerBuilder()
      .addSectionComponents([headerSection]);

    await interaction.reply({
      components: [container],
      flags: [MessageFlags.IsComponentsV2],
    });
  },
};
