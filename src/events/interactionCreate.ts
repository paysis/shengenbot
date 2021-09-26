import clientGenerator from "../util/getClient.js";
import { Command, Interaction, Message } from "discord.js";

const client = clientGenerator.client!;

/**
 * Gets invoked when a discord interaction happens.
 *
 * @param {Interaction} interaction Interaction information object
 */
async function interactionCreate(interaction: Interaction) {
  if (!interaction.isCommand()) return;

  const command: Command = client.commands.get(interaction.commandName);

  if (!command) {
    return;
  }

  try {
    await command.execute(interaction);
  } catch (err) {
    console.error(err);
    await interaction.reply({
      content: "Bu komudu çalıştırırken bir hata ile karşılaşıldı.",
      ephemeral: true,
    });
  }
}

export const isAsync = true;
export const isOnce = false;
export const name = "interactionCreate";
export const execute = interactionCreate;
