import { GatewayIntentBits } from "discord.js"
import { VoidyClient } from "./core/VoidyClient"

// Client initialization with intents and stuff...
const client = new VoidyClient({
	intents: [GatewayIntentBits.Guilds],
})

// Token validation and client start
if (!Bun.env.BOT_TOKEN) throw new Error("[Voidy] Missing bot token");
client.start(Bun.env.BOT_TOKEN);

// @Todo: Remove after core registry implementation is complete
console.log(client.registries[0]);
