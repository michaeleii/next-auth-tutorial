import { hashPassword, verifyPassword } from "@/services/auth";
import { connectToDatabase } from "@/services/db";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "PATCH") return;

  const session = await getSession({ req });
  console.log(session);

  if (!session) return res.status(401).json({ message: "Not authenticated!" });

  const userEmail = session.user?.email;
  const {
    oldPassword,
    newPassword,
  }: { oldPassword: string; newPassword: string } = req.body;

  const client = await connectToDatabase();
  const db = client.db();
  const usersCollection = db.collection("users");

  const user = await usersCollection.findOne({ email: userEmail });
  if (!user) {
    client.close();
    return res.status(404).json({ message: "User not found!" });
  }

  const currentPassword = user.password;

  const passwordsAreEqual = await verifyPassword(oldPassword, currentPassword);

  if (!passwordsAreEqual) {
    client.close();
    return res.status(403).json({ message: "Invalid password!" });
  }

  const hashedPassword = await hashPassword(newPassword);

  await usersCollection.updateOne(
    {
      email: userEmail,
    },
    {
      $set: {
        password: hashedPassword,
      },
    }
  );
  client.close();
  res.status(200).json({ message: "Password updated!" });
}
