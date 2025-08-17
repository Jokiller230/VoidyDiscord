export enum LifecycleEvents {
	// Registries
	RegistryPreCollect = "registry::preCollect",
	RegistryPostCollect = "registry::postCollect",
}

type LifecycleEventCallback = () => void;

export class Lifecycle {
	public static subscribers = new Map<string, Array<LifecycleEventCallback>>();

	public static subscribe(event: LifecycleEvents, callback: LifecycleEventCallback): void {
		const subscribers = this.subscribers.get(event);
		if (!subscribers) {
			this.subscribers.set(event, [callback]);
			return;
		}

		this.subscribers.set(event, subscribers.concat([callback]));
	}

	public static notify(event: LifecycleEvents) {
		const subscribers = this.subscribers.get(event);
		if (!subscribers) return;

		for (const subscriber of subscribers) {
			subscriber();
		}
	}
}
