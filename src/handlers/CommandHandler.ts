import { Handler } from "../core/Handler";
import type { Command } from "../loaders/CommandLoader";

export class CommandHandler extends Handler<Command> {
	public invoke(data: Command): void {
		console.log(data);
	}
}
