import { walk } from "https://deno.land/std@0.170.0/fs/walk.ts";
import { VoidyClient } from "../utils/classes/VoidyClient.ts";
import { Command } from "../utils/classes/Command.ts";
import { REST, Routes } from "discord.js";
import { RESTPostAPIChatInputApplicationCommandsJSONBody } from "discord-api-types/rest";

export async function handleCommands(client: VoidyClient, path: string = "src/commands") {
  console.log(`[Voidy] Loading commands from ${path}...`);

  const commands = [];

  // Iterate through each command found in the specified directory
  for await (const walkEntry of walk(path)) {
    if (!walkEntry.isFile) continue;

    const command: Command = (await import(`file://${Deno.cwd()}/${walkEntry.path}`)).default;

    if ("data" in command && "execute" in command) {
      client.commands.set(command.data.name, command);
      commands.push(command.data.toJSON());

      console.log(`[Voidy] Loaded command: ${command.data.name}`);
    } else {
      console.log(`[Voidy] Command ${walkEntry.path} is missing the "data" or "execute" property.`);
    }
  }

  console.log();

  // Deploy commands to all guilds
  await deployCommands(commands);
}

async function deployCommands(commands: RESTPostAPIChatInputApplicationCommandsJSONBody[]) {
  console.log(`[Voidy] Deploying ${commands.length} commands...`);

  // Grab the bot token from the BOT_TOKEN environment variable
  const token = Deno.env.get("BOT_TOKEN");
  if (!token) throw new Error("BOT_TOKEN environment variable is missing");

  // Generate a new instance of the discord.js rest client using the bot token
  const rest = new REST().setToken(token);

  // Grab the bot client id from the BOT_CLIENT_ID environment variable
  const clientId = Deno.env.get("BOT_CLIENT_ID");
  if (!clientId) throw new Error("BOT_CLIENT_ID environment variable is missing");

  // Send a put request to the application commands endpoint, the request body contains an array of all commands
  await rest.put(
    Routes.applicationCommands(clientId),
    { body: commands },
  );

  console.log(`[Voidy] Successfully deployed ${commands.length} commands.`);
  console.log();
}