import { SlashCommandBuilder } from "@discordjs/builders";

import { CommandInteraction } from "discord.js";

module.exports = {
  data: new SlashCommandBuilder()
    .setName("hapis")
    .setDescription(
      "Bir kullanıcıyı sunucudan yasaklamadan mapushane odasına atar."
    )
    .addUserOption((option) =>
      option
        .setName("kullanıcı")
        .setDescription("Mapushaneye atılacak kullanıcı")
        .setRequired(true)
    )
    .setDefaultPermission(false),
  async execute(interaction: CommandInteraction) {
    await interaction.reply(""); //TODO:
  },
};
