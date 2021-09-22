import { Client, Intents } from "discord.js";
import eventInterface from "./interfaces/eventInterface.js";
import { eventFnType } from "./types/eventTypes.js";
import fs from "fs";

import getEnv from "./util/getEnv.js";

const TOKEN = getEnv();

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

const eventFiles = fs
  .readdirSync("./events")
  .filter((file) => file.endsWith(".js"));

for (const file of eventFiles) {
  const event: eventInterface = await import(`./events/${file}`);

  let cb: eventFnType;

  if (event.isAsync) {
    cb = async (...args: unknown[]) => await event.execute(...args);
  } else {
    cb = (...args: unknown[]) => event.execute(...args);
  }

  if (event.isOnce) {
    client.once(event.name, cb);
  } else {
    client.on(event.name, cb);
  }
}

client.login(TOKEN);
