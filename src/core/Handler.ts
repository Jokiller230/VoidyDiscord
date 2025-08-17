import type { ChatInputCommandInteraction } from "discord.js";
import type { VoidyClient } from "./VoidyClient";

interface IHandler<T extends object> {
	invoke: (data: ChatInputCommandInteraction) => void
}

export abstract class Handler<T extends object> implements IHandler<T> {
	protected client: VoidyClient;

	public constructor(client: VoidyClient) {
		this.client = client;
	}

	public abstract invoke(data: ChatInputCommandInteraction): void
}
