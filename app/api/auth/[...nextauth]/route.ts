import { baseAuthOptions } from "@/lib/auth/authOptions";
import { adapter } from "@/lib/prismadb";
import NextAuth, { AuthOptions } from "next-auth";
import { decode, encode } from "next-auth/jwt";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";
import { randomUUID } from "node:crypto";

interface Context {
  params: { nextauth: string[] };
}

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
            sameSite: "none",
            secure: true,
            httpOnly: true,
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
