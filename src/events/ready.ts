import { Events } from "discord.js";
import type { Event } from "../loaders/EventLoader";

export default {
	name: Events.ClientReady,
	once: false,
	execute: () => {

	}
} as Event;
