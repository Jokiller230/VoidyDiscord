//===============================================
//  Imports
//===============================================
import type { Event } from "../core/types/Event";
import { Loader } from "../core/Loader";

//===============================================
//  EventLoader Implemenation
//===============================================
export class EventLoader extends Loader<Event> {
	public id = "event";
	public async validate(data: Partial<Event>) {
		if (!data.id || !data.name || !data.execute) return null;
		return data as Event;
	}
}
