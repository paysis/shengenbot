import { SlashCommandBuilder } from "@discordjs/builders";
import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v9";

import getEnv from "./getEnv.js";
import getClient from "./getClient.js";

export default function deployCommands(): void {
  const TOKEN = getEnv().token;

  const commands = [
    new SlashCommandBuilder()
      .setName("kayıt")
      .setDescription("Sunucuya yeni katılan kullanıcıyı kayıt eder.")
      .addUserOption((option) =>
        option
          .setName("kullanıcı")
          .setDescription("Kayıt edilecek kullanıcı")
          .setRequired(true)
      ),
    new SlashCommandBuilder()
      .setName("hapis")
      .setDescription(
        "Bir kullanıcıyı sunucudan yasaklamadan mapushane odasına atar."
      )
      .addUserOption((option) =>
        option
          .setName("kullanıcı")
          .setDescription("Mapushaneye atılacak kullanıcı")
          .setRequired(true)
      ),
    new SlashCommandBuilder()
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
      ),
  ];

  const rest = new REST({ version: "9" }).setToken(TOKEN);
  rest
    .put(Routes.applicationCommands(getClient.client.user!.id), {
      body: commands,
    })
    .then(() =>
      console.log(`Successfully registered global application commands.`)
    )
    .catch(console.error);
}
