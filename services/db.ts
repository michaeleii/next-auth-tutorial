import { MongoClient } from "mongodb";

export async function connectToDatabase() {
  return await MongoClient.connect(
    "mongodb+srv://michael:YxO0ijvqWLdRfA2D@cluster0.hma5dxn.mongodb.net/?retryWrites=true&w=majority"
  );
}
