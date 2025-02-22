import { GatewayIntentBits } from "discord.js";
import { VoidyClient } from "./utils/classes/VoidyClient.ts";
import { handleCommands } from "./handlers/handleCommand.ts";
import { handleEvents } from "./handlers/handleEvents.ts";
import * as mongoose from "mongoose";

// Create bot client instance
const client = new VoidyClient({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.MessageContent] });

// Attempt database connection
mongoose.connect("mongodb://127.0.0.1:27017/voidy").then(() => {
    console.log("[Voidy] Successfully connected to database at 127.0.0.1:27017");
}).catch((err) => {
    console.error("[Voidy] Database error: ", err);
    Deno.exit(1);
});

// Handle commands and events
await handleCommands(client, "src/commands");
await handleEvents(client, "src/events");

// Login using the specified token
client.login(Deno.env.get("BOT_TOKEN")).then(() => console.log("[Voidy] Successfully logged in!"));