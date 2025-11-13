import { PrismaAdapter } from "@auth/prisma-adapter";
import { type DefaultSession, type NextAuthConfig } from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
import GoogleProvider from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

import { db } from "~/server/db";
import z from "zod";
import { EmailZ } from "~/types/auth/email";
import { PasswordZ } from "~/types/auth/password";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      email: string;
      profileId: string;
      // ...other properties
      // role: UserRole;
    } & DefaultSession["user"];
  }

  interface User {
    profileId?: string;
    // ...other properties
    // role: UserRole;
  }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authConfig = {
  adapter: PrismaAdapter(db),
  providers: [
    DiscordProvider,
    GoogleProvider,
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        const parsed = z
          .object({
            email: EmailZ.shape.email,
            password: PasswordZ.shape.password,
          })
          .safeParse(credentials);

        if (!parsed.success) {
          throw new Error("Invalid credentials format");
        }

        const { email, password } = parsed.data;

        // Find user in database
        const user = await db.user.findUnique({
          where: { email },
          include: { profile: true },
        });

        if (!user || !user.hashedPassword || !user.profile) {
          throw new Error("Invalid credentials");
        }

        // Verify password
        const isValid = await bcrypt.compare(password, user.hashedPassword);

        if (!isValid) {
          throw new Error("Invalid credentials");
        }

        // Return user object
        return {
          id: user.id,
          email: user.email,
          profileId: user.profile.id,
        };
      },
    }),
  ],
  callbacks: {
    session: ({ session, token }) => {
      if (!token.sub || !token.profileId || !token.email) {
        throw new Error("Missing required token fields");
      }

      return {
        ...session,
        user: {
          ...session.user,
          id: token.sub,
          email: token.email,
          profileId: token.profileId as string,
        },
      };
    },
    jwt: ({ token, user }) => {
      if (user) {
        token.sub = user.id;
        token.email = user.email;
        token.profileId = user.profileId;
      }
      return token;
    },
  },
  session: {
    strategy: "jwt" as const,
  },
  pages: {
    // signOut: "/",
    signIn: "/auth/signup",
  },
} satisfies NextAuthConfig;
