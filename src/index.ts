import { Events, GatewayIntentBits } from "discord.js";
import { VoidyClient } from "./utils/classes/VoidyClient.ts";
import { handleCommands } from "./handlers/commandHandler.ts";

// Create bot client instance
const client = new VoidyClient({ intents: [GatewayIntentBits.Guilds] });

client.once(Events.ClientReady, (event) => {
  console.log(`[Voidy] Ready on account ${event.user.username}#${event.user.discriminator}`);
})

// Handle commands and events
await handleCommands(client, "src/commands");
// Todo: handle events

// Login using the specified token
client.login(Deno.env.get("BOT_TOKEN")).then(() => console.log("[Voidy] Successfully logged in!"));