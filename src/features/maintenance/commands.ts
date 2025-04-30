import {
  CommandInteraction,
  ContainerBuilder,
  MediaGalleryBuilder,
  MediaGalleryItemBuilder,
  MessageFlags,
  PermissionFlagsBits,
  SlashCommandBuilder,
  TextDisplayBuilder,
} from "discord.js";
import type { Command, FeatureContext } from "../../core/types.ts";
import { inspect } from "node:util";

export const reloadCommand: Command = {
  data: new SlashCommandBuilder()
    .setName("reload")
    .setDescription("Reload all features (admin only)")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

  execute: async (interaction: CommandInteraction, context: FeatureContext) => {
    await interaction.deferReply({ ephemeral: true });

    try {
      const registry = context.client.registry;

      await interaction.editReply("🧹 Cleaning up features...");
      await registry.cleanupAll();

      console.log("🔍 Reloading features...");
      await interaction.editReply("🔍 Reloading features...");
      await registry.loadFeaturesFromDirectory("src/features");

      await interaction.editReply("📡 Re-deploying commands...");
      await registry.deployCommands();

      await interaction.editReply("✅ Notifying features...");
      await registry.notifyReady();

      await interaction.editReply("✅ Features reloaded successfully.");
    } catch (err) {
      console.error("❌ Reload failed:", err);
      await interaction.editReply("❌ Reload failed. Check logs.");
    }
  },
};

const OWNER_ID = "423520077246103563";

export const evalCommand: Command = {
  data: new SlashCommandBuilder()
    .setName("eval")
    .setDescription("Execute JavaScript code (owner only)")
    .addStringOption((opt) =>
      opt.setName("code").setDescription("JS code to execute").setRequired(true)
    )
    .addBooleanOption((opt) =>
      opt.setName("is_image").setDescription(
        "Whether to expect an image",
      )
    ) as SlashCommandBuilder,

  execute: async (
    interaction: CommandInteraction,
    _context: FeatureContext,
  ) => {
    if (!interaction.isChatInputCommand()) return;
    const userId = interaction.user.id;

    if (userId !== OWNER_ID) {
      interaction.reply({
        content: "❌ You are not authorized to use this.",
        ephemeral: true,
      });

      return;
    }

    const code = interaction.options.getString("code", true);

    try {
      const result = await eval(`(async () => { ${code} })()`);
      const output = inspect(result, { depth: 1 });

      const headerText = new TextDisplayBuilder()
        .setContent("✅ Eval Success");

      const contentText = new TextDisplayBuilder()
        .setContent("```js\n" + output + "\n```");

      const container = new ContainerBuilder()
        .addTextDisplayComponents([headerText, contentText]);

      if (interaction.options.getBoolean("is_image", false)) {
        const galleryItemComponent = new MediaGalleryItemBuilder().setURL(
          output.split("'")[1],
        );
        const galleryComponent = new MediaGalleryBuilder().addItems(
          galleryItemComponent,
        );

        container.addMediaGalleryComponents(galleryComponent);
      }

      await interaction.reply({
        components: [container],
        flags: [MessageFlags.IsComponentsV2, MessageFlags.Ephemeral],
      });
    } catch (err) {
      const headerText = new TextDisplayBuilder()
        .setContent("❌ Eval Error");

      const contentText = new TextDisplayBuilder()
        .setContent("```js\n" + err?.toString() + "\n```");

      const container = new ContainerBuilder()
        .addTextDisplayComponents([headerText, contentText]);

      await interaction.reply({
        components: [container],
        flags: [MessageFlags.IsComponentsV2, MessageFlags.Ephemeral],
      });
    }
  },
};
