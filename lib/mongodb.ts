import { MongoClient, ServerApiVersion } from "mongodb";
import mongoose from "mongoose";
if (!process.env.MONGODB_URI) {
  throw new Error("MONGO_URL is not set");
}

const uri = process.env.MONGODB_URI;
const options = {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;
mongoose.connect(uri);
if (process.env.NODE_ENV === "development") {
  let globalMongo = global as typeof globalThis & {
    _mongoClientPromise: Promise<MongoClient>;
  };

  if (!globalMongo._mongoClientPromise) {
    client = new MongoClient(uri, options);
    globalMongo._mongoClientPromise = client.connect();
  }
  clientPromise = globalMongo._mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;
