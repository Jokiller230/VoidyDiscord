import { SlashCommandBuilder } from "discord.js/builders";
import { CommandInteraction } from "discord.js";
import { VoidyClient } from "./VoidyClient.ts";

export class Command {
  constructor(
    options: {
      data: SlashCommandBuilder,
      execute: (interaction: CommandInteraction, client: VoidyClient) => void
    }
  ) {
    this.data = options.data;
    this.execute = options.execute;
  }

  public data: SlashCommandBuilder;
  public execute: (interaction: CommandInteraction, client: VoidyClient) => void;
}