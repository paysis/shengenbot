import { Client, Collection, Intents } from "discord.js";
import getEnv from "./getEnv.js";

class ClientStore {
  static instance: null | ClientStore = null;

  _client: Client | undefined;

  constructor() {
    if (!ClientStore.instance) {
      const TOKEN = getEnv().token;

      this._client = new Client({
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

      this._client.commands = new Collection();

      this._client.login(TOKEN);

      ClientStore.instance = this;
    }

    return ClientStore.instance;
  }

  get client() {
    return this._client;
  }
}

const instance = new ClientStore();
Object.freeze(instance);
export default instance;

// function getClient() {
//   let instance: Client;

//   function createInstance() {
//     const TOKEN = getEnv().token;

//     const client = new Client({
//       intents: [
//         Intents.FLAGS.GUILDS,
//         Intents.FLAGS.GUILD_MEMBERS,
//         Intents.FLAGS.GUILD_MESSAGES,
//         Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
//         Intents.FLAGS.GUILD_MESSAGE_TYPING,
//         Intents.FLAGS.GUILD_PRESENCES,
//         Intents.FLAGS.GUILD_INVITES,
//         Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
//         Intents.FLAGS.GUILD_BANS,
//       ],
//     });

//     client.commands = new Collection();

//     client.login(TOKEN);

//     return client;
//   }

//   return {
//     get client() {
//       if (!instance) {
//         instance = createInstance();
//       }

//       return instance;
//     },
//   };
// }

// const clientGenerator = getClient();

// export default clientGenerator;
