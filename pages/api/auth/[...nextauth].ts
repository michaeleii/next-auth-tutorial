import NextAuth from "next-auth/next";
import { authOptions } from "@/services/auth";

export default NextAuth(authOptions);
