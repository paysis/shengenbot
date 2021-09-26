import getDatabase from "../../getDatabase.js";

function addMinutes(date: Date, minutes: number) {
  return new Date(date.getTime() + minutes * 60000);
}

function addDays(date: Date, days: number) {
  return new Date(date.getTime() + days * 24 * 60 * 60 * 1000);
}

async function setTimeout(guildID: number, memberID: number, howLong: string) {
  let until = new Date();

  switch (howLong) {
    case "one_hour":
      until = addMinutes(until, 60);
      break;
    case "six_hours":
      until = addMinutes(until, 60 * 6);
      break;
    case "twelve_hours":
      until = addMinutes(until, 60 * 12);
      break;
    case "one_day":
      until = addDays(until, 1);
      break;
    case "three_days":
      until = addDays(until, 3);
      break;
    case "seven_days":
      until = addDays(until, 7);
      break;
    case "thirty_days":
      until = addDays(until, 30);
      break;
    default:
      until = new Date(0);
      break;
  }

  const database = getDatabase.instance!;

  database.models.timeout.create({
    guildID,
    memberID,
    until: until.toISOString(),
  });

  //TODO: add database interaction
}
