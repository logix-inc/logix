import {NextAuthOptions} from "next-auth";

import AppleProvider from "next-auth/providers/apple";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import clientPromise from "./mongodb-client";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },
  secret: process.env.NEXTAUTH_SECRET,
  cookies: {
    pkceCodeVerifier: {
      name: "next-auth.pkce.code_verifier",
      options: {
        httpOnly: true,
        sameSite: "none",
        path: "/",
        secure: true,
      },
    },
  },
  providers: [
    AppleProvider({
      clientId: process.env.APPLE_ID as string,
      clientSecret: process.env.APPLE_SECRET as string,
      checks: ["pkce"],
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        const client = await clientPromise;
        const db = client.db() as any;

        const user = await db.collection("users").findOne({email: credentials?.email});

        const bcrypt = require("bcrypt");

        const passwordCorrect = await bcrypt.compare(credentials?.password, user?.password);

        if (passwordCorrect) {
          return {
            id: user?._id.toString(),
            email: user?.email,
            role: user?.role,
          };
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async session({session, token}) {
      if (session.user) {
        session.user.role = token.role as string | undefined;
      }
      return session;
    },
    async jwt({token, user}) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
  },
};
