import { SlashCommandBuilder } from "discord.js/builders";
import { ChatInputCommandInteraction } from "discord.js";
import { VoidyClient } from "./VoidyClient.ts";

export class Command {
  constructor(
    options: {
      data: SlashCommandBuilder,
      execute: (interaction: ChatInputCommandInteraction, client: VoidyClient) => void
    }
  ) {
    this.data = options.data;
    this.execute = options.execute;
  }

  public data: SlashCommandBuilder;
  public execute: (interaction: ChatInputCommandInteraction, client: VoidyClient) => void;
}