import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "../../../lib/mongodb";
import mongoose from "mongoose";
import User from "../../../models/User";
import { compare } from "bcryptjs";

export const authOptions = {
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "البريد الإلكتروني", type: "email", placeholder: "example@email.com" },
        password: { label: "كلمة المرور", type: "password" },
      },
      async authorize(credentials) {
        await mongoose.connect(process.env.MONGODB_URI!);
        const user = await User.findOne({ email: credentials?.email });
        if (user && await compare(credentials!.password, user.password)) {
          return { id: user._id, email: user.email, name: user.name };
        }
        return null;
      },
    }),
  ],
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },
};

export default NextAuth(authOptions); 