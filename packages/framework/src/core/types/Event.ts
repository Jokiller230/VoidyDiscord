//===============================================
//  Imports
//===============================================
import type { VoidyClient } from "../VoidyClient";
import type { ClientEvents } from "discord.js";
import type { Resource } from "./Resource";

//===============================================
//  Event Definition
//===============================================
export interface Event extends Resource {
	name: keyof ClientEvents,
	once?: boolean,
	execute: (client: VoidyClient, ...args: unknown[]) => void,
}
