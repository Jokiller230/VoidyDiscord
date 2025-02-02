import { Client, ClientOptions, Collection } from "discord.js";
import {Command} from "./Command.ts";

export class VoidyClient extends Client {
  constructor(options: ClientOptions) {
    super(options);

    this.commands = new Collection<string, Command>();
  }

  public commands: Collection<string, Command>;
}