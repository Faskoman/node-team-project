import { Document, Schema, Types, model } from "mongoose";

interface Message extends Document {
  creationDate: Date;
  author: Types.ObjectId;
  recipient: Types.ObjectId;
  content: string;
  wasRead: Boolean;
}

const messagesSchema = new Schema<Message>({
  creationDate: { type: Schema.Types.Date, default: () => new Date() },
  author: { type: Schema.Types.ObjectId, ref: "User" },
  recipient: { type: Schema.Types.ObjectId, ref: "User" },
  content: String,
  wasRead: Boolean,
});

export const Message = model<Message>("Message", messagesSchema, "messages");
