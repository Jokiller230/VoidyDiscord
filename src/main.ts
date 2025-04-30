import { VoidyClient } from "./core/client.ts";

const client = new VoidyClient();
await client.start(Deno.env.get("BOT_TOKEN")!);
