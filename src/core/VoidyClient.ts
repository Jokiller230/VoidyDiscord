import { Client, type ClientOptions } from "discord.js";
import { Registry } from "./Registry";

export class VoidyClient extends Client {
	public registries: Registry[];

	public constructor(options: ClientOptions) {
		super(options);

		this.registries = [
			new Registry(`${process.cwd()}/src/modules`),
		];
	}

	public start(token: string) {
		this.login(token);
	}
}
