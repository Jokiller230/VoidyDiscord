import { SlashCommandBuilder } from "npm:@discordjs/builders@1.10.0";
import { CommandInteraction } from "npm:discord.js@14.17.3";

export default {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Responds with pong!"),
  async execute(interaction: CommandInteraction): Promise<void> {
    await interaction.reply({ content: "Pong 🏓" });
  }
}