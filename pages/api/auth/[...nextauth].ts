import { verifyPassword } from "@/services/auth";
import { connectToDatabase } from "@/services/db";
import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

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
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
