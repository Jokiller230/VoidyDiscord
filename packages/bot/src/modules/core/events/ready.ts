import type { Event, VoidyClient } from "voidy-framework";
import { ActivityType, Events } from "discord.js";

export default {
	id: "ready",
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
