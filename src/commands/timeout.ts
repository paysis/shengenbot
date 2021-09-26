import { SlashCommandBuilder } from "@discordjs/builders";

import { CommandInteraction } from "discord.js";

module.exports = {
  data: new SlashCommandBuilder()
    .setName("timeout")
    .setDescription("Bir kullanıcıyı süreli bir şekilde susturur.")
    .addUserOption((option) =>
      option
        .setName("kullanıcı")
        .setDescription("Susturulacak kullanıcı")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("süre")
        .setDescription("Kullanıcının susturulacağı süre")
        .setRequired(true)
        .addChoice("1 saat", "one_hour")
        .addChoice("6 saat", "six_hours")
        .addChoice("12 saat", "twelve_hours")
        .addChoice("1 gün", "one_day")
        .addChoice("3 gün", "three_days")
        .addChoice("7 gün", "seven_days")
        .addChoice("30 gün", "thirty_days")
        .addChoice("sınırsız", "infinite")
    )
    .setDefaultPermission(false),
  async execute(interaction: CommandInteraction) {
    await interaction.reply(""); // TODO:
  },
};
