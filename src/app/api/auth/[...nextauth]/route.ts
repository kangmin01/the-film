import { addUser, authorizeUser, getUserFromDB } from "@/lib/user";
import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import KakaoProvider from "next-auth/providers/kakao";
import connectDB from "@/lib/connectDB";

const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await connectDB();
        if (!credentials) return null;

        const { username, password } = credentials;
        const user = await authorizeUser({ username, password });

        if (user) {
          return user;
        } else {
          return null;
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_OAUTH_ID || "",
      clientSecret: process.env.GOOGLE_OAUTH_SECRET || "",
    }),
    GitHub({
      clientId: process.env.GITHUB_OAUTH_ID || "",
      clientSecret: process.env.GITHUB_OAUTH_SECRET || "",
    }),
    KakaoProvider({
      clientId: process.env.KAKAO_OAUTH_ID || "",
      clientSecret: process.env.KAKAO_OAUTH_SECRET || "",
    }),
  ],
  callbacks: {
    async signIn({ user: { email, image } }) {
      if (!email) return false;

      addUser({ email, image });

      return true;
    },
    async session({ session, token }) {
      await connectDB();
      const user = session?.user;

      if (user) {
        const getUser = await getUserFromDB(user.email);

        session.user = {
          ...user,
          image: getUser?.image,
          username: getUser?.username,
          type: getUser?.type,
          id: getUser?.id,
        };
        session.accessToken = token.accessToken as string;
      }

      return session;
    },
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
  },
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/signin",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST, authOptions };
