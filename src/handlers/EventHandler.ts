import { VoidyClient } from "../utils/classes/VoidyClient.ts";
import { walk } from "https://deno.land/std@0.170.0/fs/walk.ts";

export class EventHandler {
  public static async loadEvents(client: VoidyClient, paths: string[] = ["src/events"]) {
    for (const path of paths) {
      await this.handleFiles(client, path);
    }
  }

  protected static async handleFiles(client: VoidyClient, path: string) {
    console.log(`[Voidy] Loading events from: ${path}...`);

    try {
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
    } catch {
      console.log(`[Voidy] Directory ${path} doesn't exist`);
    }

    console.log();
  }
}