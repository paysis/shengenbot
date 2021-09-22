import { Awaited } from "discord.js";

export type eventFnType = (...args: unknown[]) => Awaited<void>;
