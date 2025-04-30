import {
  ButtonBuilder,
  ButtonInteraction,
  ButtonStyle,
  ContainerBuilder,
  MessageFlags,
  SectionBuilder,
  TextDisplayBuilder,
} from "discord.js";
import { FeatureContext } from "../../core/types.ts";

export const refreshButton = async (
  interaction: ButtonInteraction,
  context: FeatureContext,
): Promise<void> => {
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

  await interaction.update({
    components: [container],
    flags: [MessageFlags.IsComponentsV2],
  });
};
