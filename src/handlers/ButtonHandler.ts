import type { ButtonInteraction } from "discord.js";
import type { Button } from "../loaders/ButtonLoader";
import type { VoidyClient } from "../core/VoidyClient";

export class ButtonHandler {
	public static invoke(interaction: ButtonInteraction, payload: Button, client: VoidyClient): void {
		payload.execute(interaction, client);
	}
}
