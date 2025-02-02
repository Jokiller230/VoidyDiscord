import { Events } from "discord.js";
import { GatewayReadyDispatchData } from "discord-api-types/gateway";

export default {
  name: Events.ClientReady,
  execute(event: GatewayReadyDispatchData) {
    console.log(`[Voidy] Ready on account ${event.user.username}#${event.user.discriminator}`);
  }
}