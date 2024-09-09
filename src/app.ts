import { connectDb, disconnectDB, loadEnv } from '@/config';
import cors from "cors";
import express, { Express } from "express";

import "express-async-errors";

import { authRouter } from "./routers/auth-router";
import { taskRouter } from "./routers/task-router";

loadEnv();

const app = express();
app
  .use(cors())
  .use(express.json())
  .get("/health", (_req, res) => res.send("OK!"))
  .use("/auth", authRouter)
  .use("/task", taskRouter)
export default app;

export function init(): Promise<Express> {
  connectDb();
  return Promise.resolve(app);
}

export async function close(): Promise<void> {
  await disconnectDB();
}