import { MongoClient } from "mongodb";

export async function connectToDatabase() {
  if (!process.env.MONGODB_URL) throw new Error("No MongoDB URL found");
  return await MongoClient.connect(process.env.MONGODB_URL);
}
