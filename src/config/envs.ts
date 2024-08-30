import dotenv from "dotenv";
import dotenvExpand from "dotenv-expand";

export function loadEnv() {
  const envFile = `.env${process.env.NODE_ENV ? `.${process.env.NODE_ENV}` : ''}`;
  const currentEnvs = dotenv.config({ path: envFile });
  dotenvExpand.expand(currentEnvs);
}