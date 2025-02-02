import { VoidyClient } from "../utils/classes/VoidyClient.ts";
import { walk } from "https://deno.land/std@0.170.0/fs/walk.ts";

export async function handleEvents (client: VoidyClient, path: string = "src/events") {
  console.log(`[Voidy] Loading events from ${path}...`);

  // Iterate through each event found in the specified directory
  for await (const walkEntry of walk(path)) {
    if (!walkEntry.isFile) continue;

    const event = (await import(`file://${Deno.cwd()}/${walkEntry.path}`)).default;
    if (!event) continue;

    const execute = (...args: unknown[]) => event.execute(...args, client);

    console.log(`[Voidy] Loaded event: ${event.name}`);

    if (event.once) client.once(event.name, execute);
    client.on(event.name, execute);
  }

  console.log();
}