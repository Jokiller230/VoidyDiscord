import { Events } from "discord.js";
import { Loader } from "../core/Loader";

export interface IEvent {
	name: Events,
	once?: boolean,
	execute: () => void,
}

export class EventLoader extends Loader<IEvent> {
	public override async validate(data: Partial<IEvent>) {
		if (!data.name || !data.execute) return null;
		return data as IEvent;
	}
}
