import NextAuth, { DefaultSesson } from "next-auth";

declare module "next-auth" {
  interface Session {
    accessToken: string;
    user: {
      username: string;
      type: string;
    } & DefaultSession["user"];
  }
}
