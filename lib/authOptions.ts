import GoogleProvider, { GoogleProfile } from "next-auth/providers/google";
import GitHubProvider, { GithubProfile } from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { CheckUserPassword } from "@/controllers/AuthController";
import { UUID } from "mongodb";
import { FindUserByEmail } from "@/controllers/AuthController";
import { Session } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prismadb";
import { adapter } from "@/lib/prismadb";
import { Adapter, AdapterUser } from "next-auth/adapters";
import { AuthOptions } from "next-auth";

interface SessionUser {
  session: Session;
  user: AdapterUser;
}

export const baseAuthOptions: AuthOptions = {
  adapter: adapter,
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
          emailVerified: false,
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
    CredentialsProvider({
      credentials: {
        email: {
          label: "Email",
          type: "email",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials, req) {
        if (credentials) {
          const user = await FindUserByEmail(credentials.email);
          if (!user) {
            return null;
          }
          if (await CheckUserPassword(user.id, credentials.password)) {
            return user;
          }
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async session(sessionUser: SessionUser) {
      const { session, user } = sessionUser;
      const userProfile = await prisma.userProfile.findUnique({
        where: { userId: user.id },
      });
      session.user.id = user.id;
      session.user.username = user.username;
      session.user.onboarded = user.onboarded;
      return session;
      return {
        ...session,
        user: {
          ...session.user,
          profile: userProfile,
        },
      };
    },
    async redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
  },
};
