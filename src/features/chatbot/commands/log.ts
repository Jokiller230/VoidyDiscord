import { SlashCommandBuilder } from "discord.js";
import { Command } from "../../../utils/classes/Command.ts";

export default new Command({
    data: new SlashCommandBuilder()
        .setName("log")
        .setDescription("Make the bot log any message.")
        .addStringOption((option) => option
            .setName("message")
            .setDescription("The message you'd like to send.")
            .setRequired(true)),
    execute(interaction) {
      const { options } = interaction;

      console.log(options.getString("message"));

      interaction.reply({
        content: "Successfully sent message to the logs :3",
        flags: ["Ephemeral"]
      })
    },
});