import { SlashCommandBuilder } from "@discord.js/builders";
import { ChatInputCommandInteraction } from "discord.js";
import { Command } from "../../utils/classes/Command.ts";
import { ChannelType } from "discord-api-types/payloads";

export default new Command({
  data: new SlashCommandBuilder()
    .setName("say")
    .setDescription("Make the bot say any message in the active guild channel.")
    .addStringOption((option) => option
      .setName("message")
      .setDescription("The message you'd like to send.")
      .setRequired(true)),

  async execute(interaction: ChatInputCommandInteraction): Promise<void> {
    await interaction.reply({
      content: `Message has been received and will be sent shortly!`,
      flags: ["Ephemeral"]
    });

    if(interaction.channel && interaction.channel.type === ChannelType.GuildText){
      interaction.channel?.send({ content: interaction.options.getString("message") ?? "" });
    }
  }
})