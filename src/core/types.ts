import {
  ButtonInteraction,
  CommandInteraction,
  SlashCommandBuilder,
} from "discord.js";
import { VoidyClient } from "./client.ts";

export interface Command {
  data: SlashCommandBuilder;
  execute: (
    interaction: CommandInteraction,
    context: FeatureContext,
  ) => Promise<void>;
}

export interface Event {
  name: string;
  once?: boolean;
  execute: (
    data: object,
    context: FeatureContext,
  ) => Promise<void> | void;
}

export type ButtonHandler = (
  interaction: ButtonInteraction,
  context: FeatureContext,
) => Promise<void>;

export interface Feature {
  id: string;
  name: string;
  description?: string;

  commands?: Command[];
  events?: Event[];
  buttonHandlers?: Map<string, ButtonHandler>;

  // Optional lifecycle hooks
  setup?: () => Promise<void>;
  onReady?: () => Promise<void>;
  cleanup?: () => Promise<void>;
}

export interface FeatureContext {
  client: VoidyClient;
  createCustomId: (id: string) => string;
}
