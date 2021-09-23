import clientGenerator from "../util/getClient.js";
import { Interaction } from "discord.js";

/**
 * Gets invoked when a discord interaction happens.
 *
 * @param {Interaction} interaction Interaction information object
 */
async function interactionCreate(interaction: Interaction) {
  if (!interaction.isCommand()) return;
}

export const isAsync = true;
export const isOnce = false;
export const name = "interactionCreate";
export const execute = interactionCreate;
