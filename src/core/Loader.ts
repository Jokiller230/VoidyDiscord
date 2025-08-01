export interface ILoader {
	store: object[];

	collect: () => Promise<ThisType<this>>,
	getJSON: () => object,
}

export class Loader implements ILoader {
	public store = [];

	public async collect() {
		return this;
	}

	public getJSON() {
		return {};
	}
};
