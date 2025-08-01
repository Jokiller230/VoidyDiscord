import type { Feature } from "../../core/types.ts";
import { pingCommand, uploadCommand } from "./commands.ts";
import { refreshButton } from "./interactions.ts";

const UtilityFeature: Feature = {
  id: "utility",
  name: "Utility Commands",

  commands: [pingCommand, uploadCommand],
  buttonHandlers: new Map([
    ["refresh", refreshButton],
  ]),
};

export default UtilityFeature;
