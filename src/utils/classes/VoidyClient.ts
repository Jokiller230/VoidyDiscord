import { Client, ClientOptions, Collection } from "discord.js";

export class VoidyClient extends Client {
  constructor(options: ClientOptions) {
    super(options);

    this.commands = new Collection<string, object>();
  }

  public commands: Collection<string, object>;
}