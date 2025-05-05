import type { Feature, FeatureContext } from "../../core/types.ts";

const messageCreateEvent = {
  name: "messageCreate",

  execute(_data: object, context: FeatureContext) {
    console.log(
      `messageCreate event executed in statistics feature, by ${context.client?.user?.tag}`,
    );
  },
};

const StatisticsFeature: Feature = {
  id: "statistics",
  name: "Statistics",

  commands: [],
  events: [messageCreateEvent],
};

export default StatisticsFeature;
