import z from "zod";
import {
  NAME_CONSTS,
  USERNAME_CONSTS,
  LOCATION_CONSTS,
  BIO_CONSTS,
  MIN_BIRTH_DATE,
} from "~/constants/auth/sign-up";

const date = new Date();

export const ProfileZ = z.object({
  firstName: z
    .string()
    .min(
      NAME_CONSTS.minLength,
      `First name must be at least ${NAME_CONSTS.minLength} characters`,
    )
    .max(
      NAME_CONSTS.maxLength,
      `First name must be at most ${NAME_CONSTS.maxLength} characters`,
    ),
  lastName: z
    .string()
    .min(
      NAME_CONSTS.minLength,
      `Last name must be at least ${NAME_CONSTS.minLength} characters`,
    )
    .max(
      NAME_CONSTS.maxLength,
      `Last name must be at most ${NAME_CONSTS.maxLength} characters`,
    ),
  username: z
    .string()
    .min(
      USERNAME_CONSTS.minLength,
      `Username must be at least ${USERNAME_CONSTS.minLength} characters`,
    )
    .max(
      USERNAME_CONSTS.maxLength,
      `Username must be at most ${USERNAME_CONSTS.maxLength} characters`,
    ),
  location: z
    .string()
    .max(
      LOCATION_CONSTS.maxLength,
      `Location must be at most ${LOCATION_CONSTS.maxLength} characters`,
    )
    .optional(),
  bio: z
    .string()
    .max(
      BIO_CONSTS.maxLength,
      `Bio must be at most ${BIO_CONSTS.maxLength} characters`,
    )
    .optional(),
  birthDate: z
    .date()
    .refine((date) => date <= MIN_BIRTH_DATE, {
      message: `You must be at least ${MIN_BIRTH_DATE.getFullYear() - date.getFullYear()} years old to sign up.`,
    })
    .optional(),
});
