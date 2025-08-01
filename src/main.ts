import { GatewayIntentBits } from "discord.js";
import { VoidyClient } from "./core/client.ts";

const client = new VoidyClient({
  intents: [GatewayIntentBits.Guilds],
});

await client.start(Deno.env.get("BOT_TOKEN")!);
