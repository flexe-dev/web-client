import { AuthoriseUser } from "@/controllers/AuthController";
import { UUID } from "mongodb";
import { AuthOptions, Session } from "next-auth";
import { AdapterUser } from "next-auth/adapters";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider, { GithubProfile } from "next-auth/providers/github";
import GoogleProvider, { GoogleProfile } from "next-auth/providers/google";
import { cookies } from "next/headers";
import { adapter } from "../prismadb";

interface SessionUser {
  session: Session;
  user: AdapterUser;
  token: JWT;
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
          const { email, password } = credentials;
          const response = await AuthoriseUser({ email, password });
          return response;
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async session({ session, token, user }) {
      session.token = cookies().get("next-auth.session-token")?.value;
      session.user.id = user.id;
      session.user.username = user.username;
      session.user.onboarded = user.onboarded;
      return session;
    },
    async redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.username = user.username;
        token.onboarded = user.onboarded;
      }
      return token;
    },
  },
};
