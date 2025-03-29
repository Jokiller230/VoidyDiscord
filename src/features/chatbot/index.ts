import { SlashCommandBuilder } from "@discord.js/builders";
import { Command } from "../../utils/classes/Command.ts";

export default new Command({
  data: new SlashCommandBuilder()
    .setName("test"),

  async execute({ interaction }) {
    await interaction.reply({ content: "test" });
  },
});
