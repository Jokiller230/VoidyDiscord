import { SlashCommandBuilder } from "@discord.js/builders";
import { Command } from "../../utils/classes/Command.ts";

export default new Command({
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Responds with pong!"),

  async execute({ interaction, client }): Promise<void> {
    await interaction.reply({ content: `Pong 🏓 (${client.ws.ping}ms)` });
  },
});
