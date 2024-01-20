import "dotenv/config";
import { json } from "body-parser";
import cookieParser from "cookie-parser";
import express from "express";
import { createServer } from "http";
import mongoose from "mongoose";
import { router as authRouter } from "./auth.router";
import { router as propertyRouter } from "./properties.router";

export const sessionCookieName = "userId";

const app = express();

app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(json());

app.use(express.static("public"));

app.use("/api/auth", authRouter);
app.use("/view/api/properties", propertyRouter);

const server = createServer(app);
const port = process.env.PORT ?? 3000;

async function init() {
  if (!process.env.MONGO_CONNECTION_STRING) {
    throw new Error("Must provide connection string for mongodb");
  }

  await mongoose.connect(process.env.MONGO_CONNECTION_STRING, {
    dbName: "app-db-name",
  });

  server.listen(port, () =>
    console.log(`Listening on http://localhost:${port}`)
  );
}

init();
