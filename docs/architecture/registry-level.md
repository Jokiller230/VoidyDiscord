# Registry level architectural overview
The Registry level of our architecture mainly focuses on Registries, exported Module data structure, Lifecycle events, and first database interactions, to track Registry/Module states.

## Registries
All Registries will follow a common Registry structure.

The following properties are required:
- store (Where the raw structure of imported Modules is stored)

The following methods are required:
- collect (uses the ModuleLoader to collect the raw JSON output of all registry modules) [registry::preCollect, registry::postCollect]
- prepare (uses various loaders to prepare Module contents, based on the Module's exports property, which exports an array of ModuleExportItem's.) [registry::prePrepare, registry::postPrepare]
- activate (activates the registry and all contained features) [registry::preActivate, registry::postActivate]
- unload (deactivates all modules stored in the registry and the registry itself) [registry::preUnload, registry::postUnload]


### ModuleExportItem
Each Module provides a public `exports` property, which is an array of ModuleExportItem's, each ModuleFetchItem provides a `source` and a `loader` property.

The `source` property is a simple path, pointing to a directory or file.
The `loader` property takes an uninitialized loader class, which is then instantiated by the Registry, while loading the Module.


@Todo: document registry error-notify feature, which uses a Module's author field, to notify the user of an error, directly within Discord.
