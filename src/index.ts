import { GatewayIntentBits } from "discord.js";
import { VoidyClient } from "./utils/classes/VoidyClient.ts";
import { CommandHandler } from "./handlers/CommandHandler.ts";
import { EventHandler } from "./handlers/EventHandler.ts";
import { FeatureHandler } from "./handlers/FeatureHandler.ts";
import * as mongoose from "mongoose";

// Create bot client instance
const client = new VoidyClient({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.MessageContent],
});

// Attempt database connection
await mongoose
  .connect(Deno.env.get("DB_URI") ?? "mongodb://")
  .then(() => {
    console.log(
      "[Voidy] Successfully connected to database!",
    );
    console.log("");
  })
  .catch((err) => {
    console.error("[Voidy] Database error: ", err);
    Deno.exit(1);
  });

// Handle standalone commands and events
await CommandHandler.loadCommands(client, ["src/commands"]);
await EventHandler.loadEvents(client, ["src/events"]);

// Handle Feature packs
await FeatureHandler.loadAll(client, ["src/features"]);

// Login using the specified token
client
  .login(Deno.env.get("BOT_TOKEN"))
  .then(() => console.log("[Voidy] Successfully logged in!"));
