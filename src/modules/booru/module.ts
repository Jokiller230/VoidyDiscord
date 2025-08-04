import { EventLoader } from "../../loaders/EventLoader";
import type { Module } from "../../loaders/ModuleLoader";

export default {
	name: "booru-fetcher",
	description: "Fetch images and other content from tag-based imageboards, like danbooru.",
	author: "jokiller230",

	exports: [
		{
			source: `${import.meta.dir}/events`,
			loader: EventLoader,
			handler: {}
		}
	]
} as Module;
