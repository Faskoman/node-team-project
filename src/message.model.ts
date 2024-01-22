import { Document, Schema, Types, model } from "mongoose";

interface Message extends Document {
  creationDate: Date;
  author: { id: Types.ObjectId; name: string };
  recipient: Types.ObjectId;
  content: string;
  wasRead: Boolean;
}

const messagesSchema = new Schema<Message>({
  creationDate: { type: Schema.Types.Date, default: () => new Date() },
  author: {
    id: { type: Schema.Types.ObjectId, ref: "User" },
    name: { type: String },
  },
  recipient: { type: Schema.Types.ObjectId, ref: "User" },
  content: String,
  wasRead: Boolean,
});

export const Message = model<Message>("Message", messagesSchema, "messages");
