import {
  ButtonBuilder,
  ButtonStyle,
  ChatInputCommandInteraction,
  CommandInteraction,
  ContainerBuilder,
  MessageFlags,
  SectionBuilder,
  SlashCommandBuilder,
  TextDisplayBuilder,
} from "discord.js";
import type { Command, FeatureContext } from "../../core/types.ts";

export const pingCommand: Command = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Replies with Pong and a Refresh button"),

  execute: async (interaction: CommandInteraction, context: FeatureContext) => {
    const button = new ButtonBuilder()
      .setCustomId(context.createCustomId("refresh"))
      .setLabel("🔁 Refresh")
      .setStyle(ButtonStyle.Primary);

    const headerTitle = new TextDisplayBuilder()
      .setContent(`🏓 Pong! ${context.client.ws.ping}ms`);

    const headerSection = new SectionBuilder()
      .addTextDisplayComponents([headerTitle])
      .setButtonAccessory(button);

    const container = new ContainerBuilder()
      .addSectionComponents([headerSection]);

    await interaction.reply({
      components: [container],
      flags: [MessageFlags.IsComponentsV2],
    });
  },
};

export const uploadCommand: Command = {
  data: new SlashCommandBuilder()
    .setName("upload")
    .setDescription("Uploads an image to the contest API")
    .addAttachmentOption((option) =>
      option
        .setName("image")
        .setDescription("The image to upload")
        .setRequired(true)
    )
    .addIntegerOption((option) =>
      option
        .setName("contest_id")
        .setDescription("The contest ID")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("participant_name")
        .setDescription("The name of the participant")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("participant_email")
        .setDescription("The email of the participant")
        .setRequired(true)
    ),

  execute: async (
    interaction: ChatInputCommandInteraction,
    _context: FeatureContext,
  ) => {
    const attachment = interaction.options.getAttachment("image", true);
    const contestId = interaction.options.getInteger("contest_id", true);
    const participantName = interaction.options.getString(
      "participant_name",
      true,
    );
    const participantEmail = interaction.options.getString(
      "participant_email",
      true,
    );

    await interaction.deferReply({ ephemeral: true });

    try {
      const fileResponse = await fetch(attachment.url);
      const fileBuffer = await fileResponse.arrayBuffer();

      const form = new FormData();
      form.append("image", new Blob([fileBuffer]));
      form.append("contest_id", contestId.toString());
      form.append("participant_name", participantName);
      form.append("participant_email", participantEmail);

      const res = await fetch("http://localhost:8000/api/upload-drawing", {
        method: "POST",
        body: form,
      });

      if (!res.ok) {
        const error = await res.text();
        console.log(error);

        await interaction.editReply({
          content: `❌ Upload failed, check console for details.`,
        });

        return;
      }

      const result = await res.json();
      await interaction.editReply({
        content: `✅ Image uploaded successfully!
        Participant ID: ${result.participant_id ?? "(not returned)"}
        Submission ID: ${result.submission_id ?? "(not returned)"}`,
      });
    } catch (err) {
      console.error(err);
      await interaction.editReply({
        content: `❌ An error occurred during upload.`,
      });

      return;
    }
  },
};
