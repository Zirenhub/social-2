import z from "zod";
import { EmailZ } from "./email";
import { PasswordZ } from "./password";
import { ProfileZ } from "./profile";

export const SignUpZ = EmailZ.merge(PasswordZ)
  .merge(ProfileZ)
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "The passwords do not match",
        path: ["confirmPassword"],
      });
    }
  });

export const LoginZ = EmailZ.merge(
  z.object({ password: PasswordZ.shape.password }),
);
