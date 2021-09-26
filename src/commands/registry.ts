import { SlashCommandBuilder } from "@discordjs/builders";

import { CommandInteraction, GuildMember } from "discord.js";

import getClient from "../util/getClient.js";

const client = getClient.client;

module.exports = {
  data: new SlashCommandBuilder()
    .setName("kayıt")
    .setDescription("Sunucuya yeni katılan kullanıcıyı kayıt eder.")
    .addUserOption((option) =>
      option
        .setName("kullanıcı")
        .setDescription("Kayıt edilecek kullanıcı")
        .setRequired(true)
    )
    .setDefaultPermission(false),
  async execute(interaction: CommandInteraction) {
    let roleToAdd = await (
      await interaction.guild!.roles.fetch()
    ).find((role) => role.name.toLowerCase().includes("kayıtlı"));

    if (!roleToAdd) {
      roleToAdd = await interaction.guild!.roles.create({
        name: "Kayıtlı",
        color: "DARK_GREY",
        reason: "There wasnt a role named 'kayıtlı'. Created by shengenbot.",
        permissions: ["VIEW_CHANNEL"], //TODO: add permissions
      });
    }

    if (
      (
        await (
          interaction.options.getMember("kullanıcı") as GuildMember
        ).fetch()
      ).roles.cache.some((role) => role.name.toLowerCase().includes("kayıtlı"))
    )
      await (interaction.options.getMember("kullanıcı") as GuildMember).roles
        .add(roleToAdd)
        .catch((err) => {
          console.error(err);
          throw err;
        });

    await interaction.reply(
      `<@${
        (interaction.options.getMember("kullanıcı") as GuildMember).id
      }> aramıza hoş geldin!`
    );
  },
};
