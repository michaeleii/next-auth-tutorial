import { compare, hash } from "bcrypt";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectToDatabase } from "./db";

export async function hashPassword(password: string) {
  return await hash(password, 12);
}

export async function verifyPassword(password: string, hashedPassword: string) {
  return await compare(password, hashedPassword);
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      credentials: {
        email: { type: "email" },
        password: { type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) throw new Error("No credentials provided");

        const client = await connectToDatabase();
        const db = client.db();
        const userCollection = db.collection("users");

        const user = await userCollection.findOne({ email: credentials.email });

        if (!user) throw new Error("No user found");

        const isValid = await verifyPassword(
          credentials.password,
          user.password
        );

        if (!isValid) throw new Error("Wrong password");

        client.close();
        return { id: String(user._id), email: user.email };
      },
    }),
  ],
};
