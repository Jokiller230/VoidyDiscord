import { walk } from "@std/fs";
import { resolve } from "@std/path";
import { Interaction } from "discord.js";
import { Feature } from "./types.ts";
import { VoidyClient } from "./client.ts";

export class FeatureRegistry {
  private client: VoidyClient;
  private features = new Map<string, Feature>();

  constructor(client: VoidyClient) {
    this.client = client;

    // Global interaction handler
    this.client.on("interactionCreate", async (interaction: Interaction) => {
      if (interaction.isChatInputCommand()) {
        for (const feature of this.features.values()) {
          for (const cmd of feature.commands ?? []) {
            if (cmd.data.name === interaction.commandName) {
              const context = {
                client: this.client,
                createCustomId: (id: string) => `${feature.id}:${id}`,
              };

              return await cmd.execute(interaction, context);
            }
          }
        }
      }

      if (interaction.isButton()) {
        const [featureId, buttonId] = interaction.customId.split(":");
        const feature = this.features.get(featureId);
        const handler = feature?.buttonHandlers?.get(buttonId);

        if (feature && handler) {
          const context = {
            client: this.client,
            createCustomId: (id: string) => `${feature.id}:${id}`,
          };

          return await handler(interaction, context);
        }
      }
    });
  }

  async loadFeaturesFromDirectory(directory: string) {
    const root = resolve(Deno.cwd(), directory);

    for await (const entry of walk(root, { includeDirs: false })) {
      if (entry.name === "index.ts") {
        const module = await import("file://" + entry.path);
        const feature: Feature = module.default;

        if (!feature || !feature.id) {
          console.warn(`❌ Invalid feature at ${entry.path}`);
          continue;
        }

        if (this.features.has(feature.id)) {
          console.warn(`⚠ Feature ID conflict: ${feature.id}`);
          continue;
        }

        this.features.set(feature.id, feature);
        await feature.setup?.();
        console.log(`🔹 Loaded feature: ${feature.name}`);
      }
    }
  }

  async deployCommands() {
    const commands = Array.from(this.features.values())
      .flatMap((f) => f.commands ?? [])
      .map((c) => c.data.toJSON());

    await this.client.application?.commands.set(commands);
    console.log(`🚀 Deployed ${commands.length} slash commands.`);
  }

  async notifyReady() {
    for (const feature of this.features.values()) {
      await feature.onReady?.();
    }
  }

  async cleanupAll() {
    for (const feature of this.features.values()) {
      try {
        await feature.cleanup?.();
      } catch (err) {
        console.warn(`⚠ Error during cleanup of ${feature.id}:`, err);
      }
    }

    this.features.clear();
  }
}
