import { Events } from "discord.js";
import { GatewayReadyDispatchData } from "discord-api-types/gateway";
import { CommandHandler } from "../../handlers/CommandHandler.ts";

export default {
  name: Events.ClientReady,
  async execute(event: GatewayReadyDispatchData) {
    await CommandHandler.deployCommands();
    
    console.log(`[Voidy] Ready on account ${event.user.username}#${event.user.discriminator}`);
  }
}