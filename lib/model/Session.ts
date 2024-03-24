import { ObjectId } from "mongodb";
import mongoose from "mongoose";
const { Schema, model } = mongoose;

const sessionSchema = new Schema(
  {
    _id: {
      type: ObjectId,
      default: new ObjectId(),
      required: true,
    },
    sessionToken: {
      type: String,
      required: true,
    },
    userId: {
      type: ObjectId,
      required: true,
    },
    expires: {
      type: Date,
      required: true,
    },
  },
  { versionKey: false }
);

const Session = mongoose.models.Session || model("Session", sessionSchema);
export default Session;
