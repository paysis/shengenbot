import envInterface from "../interfaces/envInterface.js";

/**
 * Process .env file
 *
 * TOKEN=here-goes-the-discord-bot-token
 *
 * OUTDIR=dist
 *
 * @returns {envInterface} an object containing .env properties.
 * @throws Will throw if either TOKEN or OUTDIR doesn't exist.
 */
export default function getEnv(): envInterface {
  const token = process.env.TOKEN;
  const outdir = process.env.OUTDIR;

  try {
    if (outdir) {
      process.chdir(outdir);
    } else {
      throw new Error(
        "OUTDIR environment variable does not exist. Please use .env file in top-level project directory."
      );
    }

    if (!token) {
      throw new Error(
        `TOKEN environment variable does not exist. Please use .env file in top-level project directory.`
      );
    }
  } catch (err) {
    console.log(`Error occurred while using getEnv function: ${err}`);
    throw err;
  }

  return { token, outdir };
}
