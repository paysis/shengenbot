import { Collection, CommandInteraction } from "discord.js";
import { SlashCommandBuilder } from "@discordjs/builders";

declare module "discord.js" {
  export interface Client {
    commands: Collection<unknown, any>;
  }

  export interface Command {
    data: SlashCommandBuilder;
    execute: (
      interaction: CommandInteraction,
      ...args: unknown
    ) => void | Promise<void>;
  }
}
