import type { ButtonInteraction } from "discord.js";
import { Loader } from "../core/Loader";
import type { VoidyClient } from "../core/VoidyClient";

export interface Button {
	id: string,
	execute: (
		interaction: ButtonInteraction, client: VoidyClient
	) => Promise<void>
}

export class ButtonLoader extends Loader<Button> {
	public override async validate(data: Partial<Button>) {
		if (!data.id || !data.execute) return null;
		return data as Button;
	}
}
