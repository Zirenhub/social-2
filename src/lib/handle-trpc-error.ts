import { Prisma } from "@prisma/client";
import { TRPCError } from "@trpc/server";

/**
 * Normalizes any caught error into a TRPCError.
 * - Re-throws existing TRPCError as-is.
 * - Converts known Prisma errors (e.g. P2002) into meaningful TRPCError.
 * - Wraps all other errors in INTERNAL_SERVER_ERROR.
 */
export function handleTRPCError(err: unknown): never {
  if (err instanceof TRPCError) {
    throw err;
  }

  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    switch (err.code) {
      case "P2002":
        throw new TRPCError({
          code: "CONFLICT",
          message: "A unique constraint error occurred.",
          cause: err,
        });
      case "P2025":
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Record not found.",
          cause: err,
        });
    }
  }

  throw new TRPCError({
    code: "INTERNAL_SERVER_ERROR",
    message: "An unexpected error occurred, please try again later.",
    cause: err,
  });
}
