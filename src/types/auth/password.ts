import { z } from "zod";
import { PASSWORD_CONSTS } from "~/constants/auth/sign-up";

export const PasswordZ = z.object({
  password: z
    .string({ message: "Password must be included." })
    .trim()
    .min(PASSWORD_CONSTS.minLength, {
      message: `Password can't be fewer than ${PASSWORD_CONSTS.minLength} characters`,
    })
    .max(PASSWORD_CONSTS.maxLength, {
      message: `Password can't be longer than ${PASSWORD_CONSTS.maxLength} characters`,
    }),
  confirmPassword: z.string({
    message: "Confirm Password must be included.",
  }),
});

export const ConfirmPasswordZ = PasswordZ.superRefine(
  ({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "The passwords do not match",
        path: ["confirmPassword"],
      });
    }
  },
);
