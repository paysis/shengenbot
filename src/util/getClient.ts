import { Client, Intents } from "discord.js";
import getEnv from "./getEnv.js";

function getClient() {
  let instance: Client;

  function createInstance() {
    const TOKEN = getEnv().token;

    const client = new Client({
      intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
        Intents.FLAGS.GUILD_MESSAGE_TYPING,
        Intents.FLAGS.GUILD_PRESENCES,
        Intents.FLAGS.GUILD_INVITES,
        Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
        Intents.FLAGS.GUILD_BANS,
      ],
    });

    client.login(TOKEN);

    return client;
  }

  return {
    get client() {
      if (!instance) {
        instance = createInstance();
      }

      return instance;
    },
  };
}

const clientGenerator = getClient();

export default clientGenerator;
