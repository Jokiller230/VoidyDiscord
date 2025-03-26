import { walk } from "https://deno.land/std@0.170.0/fs/walk.ts";
import { VoidyClient } from "../utils/classes/VoidyClient.ts";
import { Command } from "../utils/classes/Command.ts";
import { REST, Routes } from "discord.js";
import { RESTPostAPIChatInputApplicationCommandsJSONBody } from "discord-api-types/rest";

export class CommandHandler {
  protected static commands: RESTPostAPIChatInputApplicationCommandsJSONBody[] =
    [];

  public static async loadCommands(
    client: VoidyClient,
    paths: string[] = ["src/commands"],
  ) {
    for (const path of paths) {
      await this.loadFiles(client, path);
    }

    console.log();
  }

  public static async deployCommands() {
    console.log(`[Voidy] Deploying ${this.commands.length} commands...`);

    // Grab the bot token from the BOT_TOKEN environment variable
    const token = Deno.env.get("BOT_TOKEN");
    if (!token) throw new Error("BOT_TOKEN environment variable is missing");

    // Generate a new instance of the discord.js rest client using the bot token
    const rest = new REST().setToken(token);

    // Grab the bot client id from the BOT_CLIENT_ID environment variable
    const clientId = Deno.env.get("BOT_CLIENT_ID");
    if (!clientId) {
      throw new Error("BOT_CLIENT_ID environment variable is missing");
    }

    // Send a put request to the application commands endpoint, the request body contains an array of all commands
    await rest.put(
      Routes.applicationCommands(clientId),
      { body: this.commands },
    );

    console.log(
      `[Voidy] Successfully deployed ${this.commands.length} commands.\n`,
    );
  }

  protected static async loadFiles(client: VoidyClient, path: string) {
    console.log(`[Voidy] Loading commands from: ${path}...`);

    try {
      // Iterate through each command found in the specified directory
      for await (const walkEntry of walk(path)) {
        if (!walkEntry.isFile) continue;

        const command: Command =
          (await import(`file://${Deno.cwd()}/${walkEntry.path}`)).default;

        if ("data" in command && "execute" in command) {
          client.commands.set(command.data.name, command);
          this.commands.push(command.data.toJSON());

          console.log(`[Voidy] Loaded command: ${command.data.name}`);
        } else {
          console.log(
            `[Voidy] Command ${walkEntry.path} is missing the "data" or "execute" property.`,
          );
        }
      }
    } catch {
      console.log(`[Voidy] Directory ${path} doesn't exist`);
    }
  }
}
