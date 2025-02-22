import { VoidyClient } from "./VoidyClient.ts";

export class Event {
    constructor(
        options: {
            name: string,
            once: boolean,
            execute: (client: VoidyClient) => void
        }
    ) {
        this.name = options.name;
        this.once = options.once;
        this.execute = options.execute;
    }

    public name: string;
    public once: boolean;
    public execute: (client: VoidyClient) => void;
}