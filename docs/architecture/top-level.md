# Top level architectural overview
Anything happening before, or required by, our registries, is considered  top-level architecture.

This includes utilities such as the command and event handlers, which are consumed by lower levels of the system.

We'll go through each of the top-level components below.

## Loaders
Loaders are static classes, which provide utility methods for recursive loading of data from a data source, usually a directory.

The constructor of a loader always takes one parameter, a string/path pointer to the desired data-source.

Each loader additionally implements an asynchronous `collect` method for initial data collection.

Additionally, each loader implements their own asynchronous `validate` method, which is invoked within `collect`, to validate the contents of a file, before adding it to the Loader store.

Finally, loaders provide various means of exporting data in supported formats, through methods like `getJSON`, `getCSV` and more...

### Event loader
The event loader walks a directory and stores data from any file exporting an object that follows the Event type structure.

### Command loader
The command loader walks a directory and stores data from any file exporting an object that follows the Command type structure.

## Handlers
Handlers are static classes, which are invoked, usually on discord events or interactions.

Each handler has an `invoke` method, which is the one I mentioned calling above.

The handler then queries the core registry and all other registries afterward, to find a fitting execution target.

It's important to note that only repositories marked as active are taken into account.

@Todo: document Handler lifecycle events

## Lifecycle manager
The Lifecycle manager is a simple event manager with a fancy name, it stores subscribers of events in a map, with the event name as the key.

Additionally, it implements two very simple methods, notify - which fires lifecycle events, and subscribe - which subscribes a callback function to an event.
