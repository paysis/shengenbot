/**
 * Process .env file
 *
 * TOKEN=here-goes-the-discord-bot-token
 * OUTDIR=dist
 *
 * @returns {(string|null)} TOKEN or null.
 * @throws Will throw if either TOKEN or OUTDIR doesn't exist.
 */
export default function getEnv(): string {
  const TOKEN = process.env.TOKEN;
  const OUTDIR = process.env.OUTDIR;

  try {
    if (OUTDIR) {
      process.chdir(OUTDIR);
    } else {
      throw new Error(
        "OUTDIR environment variable does not exist. Please use .env file in top-level project directory."
      );
    }

    if (!TOKEN) {
      throw new Error(
        `TOKEN environment variable does not exist. Please use .env file in top-level project directory.`
      );
    }
  } catch (err) {
    console.log(`Error occurred while using getEnv function: ${err}`);
    throw err;
  }

  return TOKEN;
}
