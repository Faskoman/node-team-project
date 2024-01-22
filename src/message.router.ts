import { Router } from "express";
import { Message } from "./message.model";

export const router = Router();

router.get("/", async (_, res) => {
  try {
    const messages = await Message.find();
    res.json(messages);
  } catch (error) {
    res.status(500).send("couldn't get messages");
  }
});


