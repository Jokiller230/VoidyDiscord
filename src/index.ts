import { GatewayIntentBits } from "discord.js";
import { VoidyClient } from "./utils/classes/VoidyClient.ts";
import { handleCommands } from "./handlers/handleCommand.ts";
import { handleEvents } from "./handlers/handleEvents.ts";

// Create bot client instance
const client = new VoidyClient({ intents: [GatewayIntentBits.Guilds] });

// Handle commands and events
await handleCommands(client, "src/commands");
await handleEvents(client, "src/events");

// Login using the specified token
client.login(Deno.env.get("BOT_TOKEN")).then(() => console.log("[Voidy] Successfully logged in!"));