//===============================================
//  Imports
//===============================================
import type { ButtonInteraction } from "discord.js";
import type { VoidyClient } from "../VoidyClient";
import type { Resource } from "./Resource";

//===============================================
//  Button Definition
//===============================================
export interface Button extends Resource {
	execute: (
		interaction: ButtonInteraction, client: VoidyClient
	) => Promise<void>
}
