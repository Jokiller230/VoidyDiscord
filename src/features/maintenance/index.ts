import type { Feature } from "../../core/types.ts";
import { evalCommand, reloadCommand } from "./commands.ts";

const MaintenanceFeature: Feature = {
  id: "maintenance",
  name: "Maintenance Tools",

  commands: [reloadCommand, evalCommand],
};

export default MaintenanceFeature;
