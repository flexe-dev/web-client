import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
export const handler = NextAuth({
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID ?? "",
      clientSecret: process.env.GITHUB_SECRET ?? "",
    }),
  ],
  // Optional SQL or MongoDB database to persist users
  //   database: process.env.DATABASE_URL,
});

export { handler as GET, handler as POST };
