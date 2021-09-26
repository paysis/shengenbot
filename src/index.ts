import eventInterface from "./interfaces/eventInterface.js";
import { eventFnType } from "./types/eventTypes.js";
import fs from "fs";
import clientGenerator from "./util/getClient.js";
import { Command } from "discord.js";
import getEnv from "./util/getEnv.js";

const client = clientGenerator.client!;

const commandFiles = fs
  .readdirSync("./commands")
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const command: Command = await import(`./commands/${file}`);

  client.commands.set(command.data.name, command);
}

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
