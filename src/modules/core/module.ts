import { ButtonLoader } from "../../loaders/ButtonLoader";
import { CommandLoader } from "../../loaders/CommandLoader";
import { EventLoader } from "../../loaders/EventLoader";
import type { Module } from "../../loaders/ModuleLoader";

export default {
	name: "core",
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
