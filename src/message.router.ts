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

router.post("/message-contact", async (req, res, next) => {
  try {
    const { creationDate, author, recipient, content, wasRead } = req.body;

    if (!creationDate || !author || !recipient || !content ) {
      res.status(400);
      res.send("Must provide all fields of the property...");
      return;
    }

    const message = await Message.create({
      creationDate,
      author,
      recipient,
      content,
      wasRead,
    });

    console.log(message);
  } catch (error) {
    console.error(error);
    next(error);
  }
});
