import NextAuth, { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import clientPromise from "@/lib/mongodb";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import { Adapter } from "next-auth/adapters";

export const authOptions: NextAuthOptions = {
  adapter: MongoDBAdapter(clientPromise) as Adapter,
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID ?? "",
      clientSecret: process.env.GITHUB_SECRET ?? "",
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID ?? "",
      clientSecret: process.env.GOOGLE_SECRET ?? "",
    }),
    // CredentialsProvider({
    //   credentials: {
    //     email: {
    //       label: "Email",
    //       type: "email",
    //     },
    //     password: {
    //       label: "Password",
    //       type: "password",
    //     },
    //   },
    //   async authorize(credentials, req) {

    //   },
    // }),
  ],
  pages: {
    signIn: "/auth/login",
    newUser: "/auth/onboard",
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      //todo: Check if User is in the database
      return true;
    },
  },
};
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
