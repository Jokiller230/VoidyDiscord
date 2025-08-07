import { type ClientEvents } from "discord.js";
import { Loader } from "../core/Loader";
import type { VoidyClient } from "../core/VoidyClient";

export interface Event {
	name: keyof ClientEvents,
	once?: boolean,
	execute: (client: VoidyClient, ...args: unknown[]) => void,
}

export class EventLoader extends Loader<Event> {
	public override async validate(data: Partial<Event>) {
		if (!data.name || !data.execute) return null;
		return data as Event;
	}
}
