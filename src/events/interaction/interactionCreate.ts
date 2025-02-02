import { Events } from "discord.js";
import { VoidyClient } from "../../utils/classes/VoidyClient.ts";
import { CommandInteraction } from "discord.js";

export default {
  name: Events.InteractionCreate,
  execute(interaction: CommandInteraction, client: VoidyClient) {
    // Only handle basic chat commands for now
    if (!interaction.isChatInputCommand) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) {
      console.log(`[Voidy] Command ${interaction.commandName} not found.`);
      return;
    }

    try {
      command.execute(interaction, client);

      console.log(`[Voidy/Telemetry] Command ${interaction.commandName} was executed by ${interaction.user.username}`)
    } catch (error) {
      console.log(`[Voidy] Command ${interaction.commandName} failed: ${error}`);
    }
  }
}