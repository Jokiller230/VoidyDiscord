import { Client, ClientOptions } from "discord.js";
import { FeatureRegistry } from "./registry.ts";

export class VoidyClient extends Client {
  public registry: FeatureRegistry;

  constructor(options: ClientOptions) {
    super(options);

    this.registry = new FeatureRegistry(this);
  }

  async start(token: string) {
    await this.registry.loadFeaturesFromDirectory("src/features");

    this.once("ready", async () => {
      console.log(`✅ Logged in as ${this.user?.tag}`);

      await this.registry.deployCommands();
      await this.registry.notifyReady();
    });

    await this.login(token);
  }
}
