# Voidy Architecture Overview
The Voidy architecture is a complete re-imagination of my previous bot's command and event organization architecture.

Instead of relying on loose commands and events in respective top-level directories, the new approach groups all sorts of handlers into a single "module".

And to allow even better handling of data, modules are managed by an even higher entity, "registries".

Registries have a standalone database, used to store data of included modules.

A more detailed explainer of each system can be found in the related markdown files.
