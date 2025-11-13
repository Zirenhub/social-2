import {
  type UseFormReturn,
  type FieldValues,
  type Path,
} from "react-hook-form";
import { type TRPCClientErrorLike } from "@trpc/client";
import type { AppRouter } from "~/server/api/root";

type GenericError = TRPCClientErrorLike<AppRouter> | Error;

export function handleFormError<T extends FieldValues>(
  form: UseFormReturn<T>,
  error: GenericError,
) {
  const trpcError = error as TRPCClientErrorLike<AppRouter> | undefined;

  const zodFieldErrors = trpcError?.data?.zodError?.fieldErrors;
  if (zodFieldErrors && typeof zodFieldErrors === "object") {
    Object.entries(zodFieldErrors).forEach(([key, messages]) => {
      if (messages?.[0]) {
        form.setError(key as Path<T>, {
          type: "server",
          message: messages[0],
        });
      }
    });
    return;
  }

  const prismaMeta = trpcError?.data?.prismaError?.meta as
    | { target?: string[] }
    | undefined;

  if (prismaMeta?.target?.length) {
    prismaMeta.target.forEach((field) => {
      form.setError(field as Path<T>, {
        type: "server",
        message: `${field.charAt(0).toUpperCase()}${field.slice(1)} already in use.`,
      });
    });
    return;
  }

  if (trpcError?.message) {
    form.setError("root", {
      type: "server",
      message: trpcError.message,
    });
    return;
  }

  if (error instanceof Error && error.message) {
    form.setError("root", {
      type: "manual",
      message: error.message,
    });
    return;
  }

  form.setError("root", {
    type: "manual",
    message: "Unexpected error occurred. Please try again later.",
  });
}
