import type { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "@/services/db";
import { hashPassword } from "@/services/auth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") return;

  const { email, password }: { email: string; password: string } = req.body;

  if (
    !email ||
    !email.includes("@") ||
    !password ||
    password.trim().length < 7
  ) {
    return res.status(422).json({
      message:
        "Invalid input - password should also be at least 7 characters long.",
    });
  }
  const client = await connectToDatabase();
  const db = client.db();

  const userCollection = db.collection("users");

  const existingUser = await userCollection.findOne({ email });

  if (existingUser) {
    client.close();
    return res.status(422).json({ message: "User exists already!" });
  }

  const hashedPassword = await hashPassword(password);

  await userCollection.insertOne({ email, password: hashedPassword });

  res.status(201).json({ message: "Created user!" });

  client.close();
}
