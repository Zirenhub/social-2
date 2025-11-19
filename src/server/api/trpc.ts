/**
 * YOU PROBABLY DON'T NEED TO EDIT THIS FILE, UNLESS:
 * 1. You want to modify request context (see Part 1).
 * 2. You want to create a new middleware or type of procedure (see Part 3).
 *
 * TL;DR - This is where all the tRPC server stuff is created and plugged in. The pieces you will
 * need to use are documented accordingly near the end.
 */

import { Prisma } from "@prisma/client";
import { initTRPC, TRPCError } from "@trpc/server";
import superjson from "superjson";
import { ZodError } from "zod";

import { auth } from "~/server/auth";
import { db } from "~/server/db";

/**
 * 1. CONTEXT
 *
 * This section defines the "contexts" that are available in the backend API.
 *
 * These allow you to access things when processing a request, like the database, the session, etc.
 *
 * This helper generates the "internals" for a tRPC context. The API handler and RSC clients each
 * wrap this and provides the required context.
 *
 * @see https://trpc.io/docs/server/context
 */
export const createTRPCContext = async (opts: { headers: Headers }) => {
  const session = await auth();

  return {
    db,
    session,
    ...opts,
  };
};

function getPrismaErrorMessage(
  error:
    | Prisma.PrismaClientKnownRequestError
    | Prisma.PrismaClientValidationError,
): string {
  if (error instanceof Prisma.PrismaClientValidationError) {
    // Try to extract field name from validation error message
    const fieldMatch = /Argument `(\w+)`/.exec(error.message);
    const field = fieldMatch?.[1];
    return field
      ? `Invalid value provided for ${field}.`
      : "Invalid data provided.";
  }

  // PrismaClientKnownRequestError
  switch (error.code) {
    case "P2002": {
      const target = error.meta?.target as string[] | undefined;
      const field = target?.[0] ?? "field";
      return `This ${field} is already in use.`;
    }
    case "P2003":
      return "Invalid reference to related record.";
    case "P2025":
      return "Record not found.";
    default:
      return "Database operation failed.";
  }
}

/**
 * 2. INITIALIZATION
 *
 * This is where the tRPC API is initialized, connecting the context and transformer. We also parse
 * ZodErrors so that you get typesafety on the frontend if your procedure fails due to validation
 * errors on the backend.
 */

export const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    let message = shape.message;
    let httpStatus = shape.data.httpStatus;

    // Handle Prisma validation errors (e.g., wrong data types, missing required fields)
    if (error.cause instanceof Prisma.PrismaClientValidationError) {
      httpStatus = 400;
      message = getPrismaErrorMessage(error.cause);

      return {
        ...shape,
        message,
        data: {
          ...shape.data,
          httpStatus,
          zodError: null,
          prismaError: {
            code: "VALIDATION_ERROR",
            target: undefined,
            message: getPrismaErrorMessage(error.cause),
          },
        },
      };
    }

    // Handle Prisma known request errors (e.g., unique constraints, foreign keys)
    if (error.cause instanceof Prisma.PrismaClientKnownRequestError) {
      const prismaError = error.cause;

      switch (prismaError.code) {
        case "P2002":
          httpStatus = 409;
          message = getPrismaErrorMessage(prismaError);
          break;
        case "P2003":
          httpStatus = 400;
          message = getPrismaErrorMessage(prismaError);
          break;
        case "P2025":
          httpStatus = 404;
          message = getPrismaErrorMessage(prismaError);
          break;
        default:
          httpStatus = 500;
          message = getPrismaErrorMessage(prismaError);
      }

      return {
        ...shape,
        message,
        data: {
          ...shape.data,
          httpStatus,
          zodError: null,
          prismaError: {
            code: prismaError.code,
            target: prismaError.meta?.target as string[] | undefined,
            message: getPrismaErrorMessage(prismaError),
          },
        },
      };
    }

    // Handle Zod errors (already handled by TRPC but we format it nicely)
    return {
      ...shape,
      message,
      data: {
        ...shape.data,
        httpStatus,
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
        prismaError: null,
      },
    };
  },
});
/**
 * Create a server-side caller.
 *
 * @see https://trpc.io/docs/server/server-side-calls
 */
export const createCallerFactory = t.createCallerFactory;

/**
 * 3. ROUTER & PROCEDURE (THE IMPORTANT BIT)
 *
 * These are the pieces you use to build your tRPC API. You should import these a lot in the
 * "/src/server/api/routers" directory.
 */

/**
 * This is how you create new routers and sub-routers in your tRPC API.
 *
 * @see https://trpc.io/docs/router
 */
export const createTRPCRouter = t.router;

/**
 * Middleware for timing procedure execution and adding an artificial delay in development.
 *
 * You can remove this if you don't like it, but it can help catch unwanted waterfalls by simulating
 * network latency that would occur in production but not in local development.
 */
const timingMiddleware = t.middleware(async ({ next, path }) => {
  const start = Date.now();

  if (t._config.isDev) {
    // artificial delay in dev
    const waitMs = Math.floor(Math.random() * 400) + 100;
    await new Promise((resolve) => setTimeout(resolve, waitMs));
  }

  const result = await next();

  const end = Date.now();
  console.log(`[TRPC] ${path} took ${end - start}ms to execute`);

  return result;
});

/**
 * Public (unauthenticated) procedure
 *
 * This is the base piece you use to build new queries and mutations on your tRPC API. It does not
 * guarantee that a user querying is authorized, but you can still access user session data if they
 * are logged in.
 */
export const publicProcedure = t.procedure.use(timingMiddleware);

/**
 * Protected (authenticated) procedure
 *
 * If you want a query or mutation to ONLY be accessible to logged in users, use this. It verifies
 * the session is valid and guarantees `ctx.session.user` is not null.
 *
 * @see https://trpc.io/docs/procedures
 */
export const protectedProcedure = t.procedure
  .use(timingMiddleware)
  .use(({ ctx, next }) => {
    if (!ctx.session?.user) {
      throw new TRPCError({ code: "UNAUTHORIZED" });
    }
    return next({
      ctx: {
        // infers the `session` as non-nullable
        session: { ...ctx.session, user: ctx.session.user },
      },
    });
  });
