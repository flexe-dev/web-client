import { ObjectId } from "mongodb";
import mongoose from "mongoose";
const { Schema, model } = mongoose;

const accountSchema = new Schema(
  {
    _id: {
      type: ObjectId,
      required: true,
    },
    provider: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    providerAccountId: {
      type: String,
      required: true,
    },
    accessToken: {
      type: String,
      required: false,
    },
    userId: {
      type: ObjectId,
      required: true,
    },
    scope: {
      type: String,
      required: false,
    },
    token_type: {
      type: String,
      required: false,
    },
  },
  { versionKey: false }
);

const Account = mongoose.models.Account || model("Account", accountSchema);
export default Account;
