import { Events } from "discord.js";
import type { IEvent } from "../loaders/EventLoader";

export default {
	name: Events.ClientReady,
	once: false,
	execute: () => {

	}
} as IEvent;
