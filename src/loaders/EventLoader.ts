import { Events } from "discord.js";
import { Loader } from "../core/Loader";

export interface Event {
	name: Events,
	once?: boolean,
	execute: () => void,
}

export class EventLoader extends Loader<Event> {
	public override async validate(data: Partial<Event>) {
		if (!data.name || !data.execute) return null;
		return data as Event;
	}
}
