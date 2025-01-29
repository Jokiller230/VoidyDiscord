import { walk } from "https://deno.land/std@0.170.0/fs/walk.ts";
import { VoidyClient } from "../utils/classes/VoidyClient.ts";

export async function handleCommands(client: VoidyClient, path: string = "src/commands") {
  for await (const walkEntry of walk(path)) {
    if (!walkEntry.isFile) continue;

    const command = (await import(`file://${Deno.cwd()}/${walkEntry.path}`)).default;

    if ("data" in command && "execute" in command) {
      client.commands.set(command.data.name, command);
      console.log(`[Voidy] Loaded command: ${command.data.name}`);
    } else {
      console.log(`[Voidy] Command ${walkEntry.path} is missing the "data" or "execute" property.`);
    }
  }
}