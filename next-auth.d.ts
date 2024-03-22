import { DefaultSession, DefaultUser } from "next-auth";
import { decodeAction } from "next/dist/server/app-render/entry-base";

declare module "next-auth" {
  interface User extends DefaultUser {
    password?: String;
    username?: String;
    onboarded: Boolean;
  }

  interface Session extends DefaultSession {
    user: User;
  }
}
