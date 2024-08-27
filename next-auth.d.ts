import { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface User extends DefaultUser {
    username: string;
    onboarded: boolean;
  }

  interface Session extends DefaultSession {
    user: User;
    token?: string;
  }
}
