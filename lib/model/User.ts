import { ObjectId } from "mongodb";
import mongoose from "mongoose";
const { Schema, model } = mongoose;

const userSchema = new Schema(
  {
    _id: {
      type: ObjectId,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: false,
      default: "",
    },
    password: {
      type: String,
      nullable: true,
    },
    onboarded: {
      type: Boolean,
      default: false,
    },
    emailVerified: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false }
);

const userContentPreferencesSchema = new Schema({
  _id: ObjectId,
  userId: ObjectId,
});

const User = mongoose.models.User || model("User", userSchema);
export default User;
