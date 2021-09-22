import { eventFnType } from "../types/eventTypes.js";

export default interface eventInterface {
  name: string;
  isOnce: boolean;
  isAsync: boolean;
  execute: eventFnType;
}
