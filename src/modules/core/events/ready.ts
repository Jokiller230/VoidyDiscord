import { ActivityType, Events } from "discord.js";
import type { Event } from "../../../loaders/EventLoader";
import type { VoidyClient } from "../../../core/VoidyClient";

export default {
	name: Events.ClientReady,
	once: true,
	execute: async (client: VoidyClient) => {
		console.log("THE BOT IS READY >:3");

		client.user?.setActivity({
			name: `${client.guilds.cache.size} guilds :3`,
			type: ActivityType.Watching
		});
	}
} as Event;
