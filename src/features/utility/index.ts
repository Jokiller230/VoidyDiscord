import type { Feature } from "../../core/types.ts";
import { pingCommand } from "./commands.ts";
import { refreshButton } from "./interactions.ts";

const UtilityFeature: Feature = {
  id: "utility",
  name: "Utility Commands",

  commands: [pingCommand],
  buttonHandlers: new Map([
    ["refresh", refreshButton],
  ]),
};

export default UtilityFeature;
