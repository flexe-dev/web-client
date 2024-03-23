import NextAuth, { NextAuthOptions, Session } from "next-auth";
import GitHubProvider, { GithubProfile } from "next-auth/providers/github";
import GoogleProvider, { GoogleProfile } from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import clientPromise from "@/lib/mongodb";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import { Adapter, AdapterUser } from "next-auth/adapters";
import { UUID } from "mongodb";
import { FindUserByEmail, CreateEmailUser } from "@/controllers/AuthController";
interface SessionUser {
  session: Session;
  user: AdapterUser;
}
export const authOptions: NextAuthOptions = {
  adapter: MongoDBAdapter(clientPromise) as Adapter,
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID ?? "",
      clientSecret: process.env.GITHUB_SECRET ?? "",
      profile(profile: GithubProfile) {
        return {
          id: profile.id.toString(),
          name: profile.name,
          username: new UUID().toString(),
          email: profile.email,
          image: profile.avatar_url,
          password: undefined,
          emailVerified: null,
          onboarded: false,
        };
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID ?? "",
      clientSecret: process.env.GOOGLE_SECRET ?? "",
      profile(profile: GoogleProfile) {
        return {
          id: profile.sub,
          name: profile.name,
          username: new UUID().toString(),
          email: profile.email,
          image: profile.picture,
          password: undefined,
          emailVerified: profile.email_verified,
          onboarded: false,
        };
      },
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
    //     if (credentials?.email && credentials.password) {
    //       const user = FindUserByEmail(credentials.email);
    //       return user

    //     }

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
    async session(sessionUser: SessionUser) {
      const { session, user } = sessionUser;
      session.user.username = user.username;
      session.user.onboarded = user.onboarded;
      return session;
    },
  },
};
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
