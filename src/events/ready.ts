import { Client } from "discord.js";

/**
 * Gets invoked when discord client instance is ready.
 * @param {Client} client Discord client instance
 */
async function ready(client: Client): Promise<void> {
  if (client && client.user) {
    console.log(`${client.user.tag} is ready.`);
  }
}

export const isAsync = true;
export const isOnce = true;
export const name = "ready";
export const execute = ready;
