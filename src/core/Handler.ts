interface IHandler<T extends object> {
	invoke: (data: T) => void
}

export class Handler<T extends object> implements IHandler<T> {
	public invoke(data: T) {
		console.log(data);
	}
}
