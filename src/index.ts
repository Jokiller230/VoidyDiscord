import { GatewayIntentBits } from "discord.js"
import { VoidyClient } from "./core/VoidyClient"
import { EventLoader } from "./loaders/EventLoader";
import { join } from "node:path";

// Client initialization with intents and stuff...
const client = new VoidyClient({
	intents: [GatewayIntentBits.Guilds],
})

// Token validation and client start
if (!Bun.env.BOT_TOKEN) throw new Error("[Voidy] Missing bot token");
client.start(Bun.env.BOT_TOKEN);

// @Todo: Remove after event and command loader implementation is complete
const eventLoader = await new EventLoader(join(__dirname, "events")).collect();
console.log(eventLoader);
