import { GatewayIntentBits } from "discord.js"
import { VoidyClient } from "voidy-framework";

// Client initialization with intents and stuff...
const client = new VoidyClient({
	intents: [GatewayIntentBits.Guilds],
})

// Token validation and client start
if (!Bun.env.BOT_TOKEN) throw new Error("[Voidy] Missing bot token");
await client.start(Bun.env.BOT_TOKEN, `${import.meta.dirname}/modules`);
