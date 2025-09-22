//===============================================
//  Imports
//===============================================
import type { Button } from "../core/types/Button";
import { Loader } from "../core/Loader";

//===============================================
//  ButtonLoader Implementation
//===============================================
export class ButtonLoader extends Loader<Button> {
	public id = "button";
	public async validate(data: Partial<Button>) {
		if (!data.id || !data.execute) return null;
		return data as Button;
	}
}
