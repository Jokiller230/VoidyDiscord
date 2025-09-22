//===============================================
//  Imports
//===============================================
import type { Command } from "../core/types/Command";
import { Loader } from "../core/Loader";

//===============================================
//  CommandLoader Implementation
//===============================================
export class CommandLoader extends Loader<Command> {
	public id = "command";
	public async validate(data: Partial<Command>) {
		if (!data.id || !data.data || !data.execute) return null;
		return data as Command;
	}
}
