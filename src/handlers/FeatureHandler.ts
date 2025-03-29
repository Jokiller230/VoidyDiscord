import { walk } from "https://deno.land/std@0.170.0/fs/walk.ts";
import { VoidyClient } from "../utils/classes/VoidyClient.ts";
import { Feature, FeatureOptions } from "../utils/classes/Feature.ts";
import { CommandHandler } from "./CommandHandler.ts";
import { EventHandler } from "./EventHandler.ts";

export class FeatureHandler {
  public static async loadAll(client: VoidyClient, paths: string[] = []) {
    console.log("====================================");

    for (const path of paths) {
      await this.handleDirectory(client, path);
    }

    console.log("====================================");
  }

  protected static async handleDirectory(client: VoidyClient, path: string) {
    console.log(`[Voidy] Loading Features from: ${path}`);
    console.log();

    for await (const walkEntry of walk(path)) {
      if (!walkEntry.isFile || walkEntry.name !== "feature.json") continue;

      const featureDirectory = walkEntry.path.split("/feature.json")[0];
      const feature = (await import(`file://${Deno.cwd()}/${walkEntry.path}`, {
        with: { type: "json" },
      })).default as FeatureOptions;
      client.features.set(feature.name, new Feature(feature));

      await CommandHandler.loadCommands(client, [
        `${featureDirectory}/commands`,
      ]);
      await EventHandler.loadEvents(client, [`${featureDirectory}/events`]);
    }
  }
}
