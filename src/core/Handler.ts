interface IHandler<T extends object> {
	invoke: (data: T) => void
}

export abstract class Handler<T extends object> implements IHandler<T> {
	public abstract invoke(data: T): void
}
