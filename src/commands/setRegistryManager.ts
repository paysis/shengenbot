import { SlashCommandBuilder } from "@discordjs/builders";

import { CommandInteraction, GuildMember } from "discord.js";

module.exports = {
  data: new SlashCommandBuilder()
    .setName("setModerator")
    .setDescription(
      "Bir kullanıcıya Shengenbot moderatör komutlarını kullanma yetkisi verir."
    )
    .addUserOption((option) =>
      option
        .setName("kullanıcı")
        .setDescription("Moderatör yetkisi verilecek kullanıcı")
        .setRequired(true)
    )
    .setDefaultPermission(false),
  async execute(interaction: CommandInteraction) {
    if (
      !(
        await (
          interaction.options.getMember("kullanıcı") as GuildMember
        ).fetch()
      ).roles.cache.some((role) => role.name.toLowerCase() === "shengenxmod")
    ) {
      let roleToAdd = await (
        await interaction.guild!.roles.fetch()
      ).find((role) => role.name.toLowerCase() === "shengenxmod");

      if (!roleToAdd) {
        roleToAdd = await interaction.guild!.roles.create({
          name: "ShengenxMod",
          color: "DARK_GOLD",
          reason:
            "There wasnt a role named shengenxmod. Created by shengenbot.",
        });
      }

      await (interaction.options.getMember("kullanıcı") as GuildMember).roles
        .add(roleToAdd)
        .catch((err) => {
          console.error(err);
          throw err;
        });

      await interaction.reply(
        `<@${
          (interaction.options.getMember("kullanıcı") as GuildMember).id
        }> artık Shengen moderatörü olmuştur!`
      );
    }
  },
};
