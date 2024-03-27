import { Adapter, AdapterUser } from "next-auth/adapters";
import { UUID } from "mongodb";
import { FindUserByEmail } from "@/controllers/AuthController";
import NextAuth, { AuthOptions, User } from "next-auth";
import { decode, encode } from "next-auth/jwt";
import { cookies } from "next/headers";
import { randomUUID } from "node:crypto";
import bcrypt from "bcryptjs";
import { NextRequest } from "next/server";
import GoogleProvider, { GoogleProfile } from "next-auth/providers/google";
import GitHubProvider, { GithubProfile } from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { Session } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/lib/prismadb";
interface Context {
  params: { nextauth: string[] };
}

interface SessionUser {
  session: Session;
  user: AdapterUser;
}
const adapter = PrismaAdapter(prisma) as Adapter;
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
          if (
            user.password &&
            (await bcrypt.compare(credentials.password, user.password))
          ) {
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
      session.user.username = user.username;
      session.user.onboarded = user.onboarded;
      return session;
    },
    async redirect({ baseUrl }) {
      return baseUrl;
    },
  },
};
// Configuration wrapper for NextAuth
const authOptionsWrapper = (request: NextRequest, context: Context) => {
  const { params } = context;

  // Determine if the current request is related to credentials callback
  const isCredentialsCallback =
    params?.nextauth?.includes("callback") &&
    params.nextauth.includes("credentials") &&
    request.method === "POST";

  // Common JWT options shared between encode and decode
  const commonJwtOptions: AuthOptions["jwt"] = {
    maxAge: 60 * 60 * 24 * 30,
    encode: async (arg) => {
      if (isCredentialsCallback) {
        // Retrieve and return session token from the cookie
        const cookie = cookies().get("__Secure-next-auth.session-token");
        return cookie?.value || "";
      }
      return encode(arg);
    },
    decode: async (arg) => {
      if (isCredentialsCallback) {
        // Prevent decoding during credentials callback
        return null;
      }
      return decode(arg);
    },
  };
  const authOptions: AuthOptions = {
    ...baseAuthOptions,
    callbacks: {
      // Handle sign-in events
      ...baseAuthOptions.callbacks,
      async signIn({ user }) {
        if (isCredentialsCallback && user) {
          // Generate session token and set cookie
          const sessionToken = randomUUID();
          const sessionExpiry = new Date(Date.now() + 60 * 60 * 24 * 30 * 1000);
          if (adapter.createSession) {
            await adapter.createSession({
              sessionToken: sessionToken,
              userId: user.id,
              expires: sessionExpiry,
            });
          }
          cookies().set("__Secure-next-auth.session-token", sessionToken, {
            expires: sessionExpiry,
          });
        }
        return true;
      },
    },
    jwt: commonJwtOptions,
    debug: process.env.NODE_ENV === "development",
    pages: {
      signIn: "/auth/login",
      signOut: "/",
    },
  };

  return [request, context, authOptions] as const;
};

// Authentication handler using NextAuth
function handler(request: NextRequest, context: Context) {
  return NextAuth(...authOptionsWrapper(request, context));
}

// Export handler for GET and POST requests
export { handler as GET, handler as POST };
