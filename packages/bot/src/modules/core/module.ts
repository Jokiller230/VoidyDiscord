import {
	ButtonLoader,
	CommandLoader,
	EventLoader,
	type Module
} from "voidy-framework";

export default {
	id: "core",
	name: "Core",
	description: "The core feature set of the bot, required for command handling to work.",
	author: "jokiller230",

	exports: [
		{
			source: `${import.meta.dir}/events`,
			loader: EventLoader,
		},
		{
			source: `${import.meta.dir}/commands`,
			loader: CommandLoader,
		},
		{
			source: `${import.meta.dir}/buttons`,
			loader: ButtonLoader,
		}
	]
} as Module;
