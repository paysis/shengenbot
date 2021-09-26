import { SlashCommandBuilder } from "@discordjs/builders";
import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v9";
import fs from "fs";
import getEnv from "./getEnv.js";
import getClient from "./getClient.js";
import { Command } from "discord.js";

export default async function deployCommands(): Promise<void> {
  const TOKEN = getEnv().token;

  const commands = [];

  const commandFiles = fs
    .readdirSync("./commands")
    .filter((file) => file.endsWith(".js"));

  for (const file of commandFiles) {
    const command: Command = await import(`./commands/${file}`);
    commands.push(command.data.toJSON());
  }

  const rest = new REST({ version: "9" }).setToken(TOKEN);
  rest
    .put(Routes.applicationCommands(getClient.client!.user!.id), {
      body: commands,
    })
    .then(() =>
      console.log(`Successfully registered global application commands.`)
    )
    .catch(console.error);
}
