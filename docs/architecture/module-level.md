# Module level architectural overview
Modules are groups of commands, events and more.
They export those, and provide a combined title, description and the discord name of the user who created them, using the author field.

## Modules
Each module *can* contain a set of commands, events or subscribers.

Subsribers are similar to events, but are related to the internal Lifecycle management of the bot, not Discord.

These are the properties a module is required to provide:
- name (a small and concise name for the module, e.g. "statistics")
- description (a small text, which describes the use-cases of the module)
- author (discord username of the module's author)
- exports (an array of ModuleExportItem's, each containing a `source` and uninstantiated `loader` property)
