import { SlashCommandBuilder } from "@discord.js/builders";
import { CommandInteraction } from "discord.js";
import { Command } from "../../utils/classes/Command.ts";
import { VoidyClient } from "../../utils/classes/VoidyClient.ts";

export default new Command({
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Responds with pong!"),

  async execute(interaction: CommandInteraction, client: VoidyClient): Promise<void> {
    await interaction.reply({ content: `Pong 🏓 (${client.ws.ping}ms)` });
  }
})