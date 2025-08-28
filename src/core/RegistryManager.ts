import { Registry, type RegistryCache } from "./Registry"

interface IRegistryManager {
	addRegistry: (newRegistry: Registry) => boolean
	getRegistry: (registryID: string) => Registry | null

	prepareRegistries: () => void
	getCache: () => RegistryCache
}

export class RegistryManager implements IRegistryManager {
	private registries = new Map<string, Registry>();

	public addRegistry(newRegistry: Registry) {
		// Append registry to registries array if ID is unique,
		// else return false.
		if (this.registries.get(newRegistry.id)) return false;
		this.registries.set(newRegistry.id, newRegistry);

		// The registry was added successfully, therefore return true.
		return true;
	}

	public getRegistry(registryID: string) {
		const registry = this.registries.get(registryID);

		if (!registry) return null;
		return registry;
	}

	public async prepareRegistries() {
		for (const registry of this.registries.values()) {
			// 1. Collecting required registry data
			console.info(`[Voidy] Collecting registry data: ${registry.dataSource}`);
			await registry.collectModules();

			// 2. Processing collected registry modules and their exports
			console.info(`[Voidy] Processing registry data: ${registry.dataSource}`);
			await registry.processModules();

			// 3. Activating registry
			console.info(`[Voidy] Activating registry: ${registry.dataSource}`);
			await registry.activate();
		}
	}

	public getCache() {
		let cache: RegistryCache = {
			events: [],
			modules: [],
			commands: [],
			buttons: [],
		};

		// Combine all registry caches
		for (const registry of this.registries.values()) {
			if (registry.active) cache = { ...cache, ...registry.cache };
		}

		return cache;
	}
}
