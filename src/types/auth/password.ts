import { z } from "zod";

export const PasswordZ = z.object({
  password: z
    .string({ message: "Password must be included." })
    .trim()
    .min(3, { message: "Password can't be fewer than 3 characters" })
    .max(18, { message: "Password can't be longer than 18 characters" }),
  confirmPassword: z.string({
    message: "Confirm Password must be included.",
  }),
});
