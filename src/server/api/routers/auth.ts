import { TRPCError } from "@trpc/server";
import bcrypt from "bcryptjs";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { LoginZ, SignUpZ } from "~/types/auth";
import { EmailZ } from "~/types/auth/email";

export const authRouter = createTRPCRouter({
  emailExists: publicProcedure
    .input(EmailZ)
    .mutation(async ({ ctx, input }) => {
      const existingUser = await ctx.db.user.findUnique({
        where: { email: input.email },
      });
      return { exists: !!existingUser };
    }), // mutation because we are performing an action at a specific point in time (checking before proceeding)
  signup: publicProcedure.input(SignUpZ).mutation(async ({ ctx, input }) => {
    const existingUser = await ctx.db.user.findUnique({
      where: { email: input.email },
    });
    if (existingUser) {
      throw new TRPCError({
        code: "CONFLICT",
        message: "Email is already in use.",
      });
    }
    const hashedPassword = await bcrypt.hash(input.password, 10);
    const newUser = await ctx.db.user.create({
      data: {
        email: input.email,
        hashedPassword,
        profile: {
          create: {
            username: input.username,
            firstName: input.firstName,
            lastName: input.lastName,
            location: input.location,
            bio: input.bio,
            birthDate: input.birthDate,
          },
        },
      },
      include: { profile: true },
    });
    if (!newUser.profile) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "User profile creation failed.",
      });
    }
    return {
      id: newUser.id,
      email: newUser.email,
      profileId: newUser.profile.id,
    };
  }),
  login: publicProcedure.input(LoginZ).mutation(async ({ ctx, input }) => {
    const user = await ctx.db.user.findUnique({
      where: { email: input.email },
      include: { profile: true },
    });
    if (!user || !user.hashedPassword) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "Invalid email or password",
      });
    }
    const passwordValid = await bcrypt.compare(
      input.password,
      user.hashedPassword,
    );
    if (!passwordValid) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "Invalid email or password",
      });
    }
    if (!user.profile) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "User profile not found.",
      });
    }
    return {
      id: user.id,
      email: user.email,
      profileId: user.profile.id,
    };
  }),
});
