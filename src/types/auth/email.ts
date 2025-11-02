import { z } from "zod";

export const EmailZ = z.object({
  email: z
    .string({ message: "Email must be included." })
    .trim()
    .max(32, { message: "Email address can't be longer than 32 characters" })
    .email({ message: "Invalid email address." }),
});
