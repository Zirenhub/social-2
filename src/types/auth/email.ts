import { z } from "zod";
import { EMAIL_CONSTS } from "~/constants/auth/sign-up";

export const EmailZ = z.object({
  email: z
    .string({ message: "Email must be included." })
    .trim()
    .max(EMAIL_CONSTS.maxLength, {
      message: `Email address can't be longer than ${EMAIL_CONSTS.maxLength} characters`,
    })
    .email({ message: "Invalid email address." }),
});
