export const MIN_BIRTH_DATE = new Date(2013, 11, 31);
export const EMAIL_CONSTS = {
  minLength: 5,
  maxLength: 32,
} as const;
export const NAME_CONSTS = {
  minLength: 1,
  maxLength: 25,
} as const;
export const USERNAME_CONSTS = {
  minLength: 3,
  maxLength: 15,
} as const;
export const LOCATION_CONSTS = {
  maxLength: 30,
} as const;
export const BIO_CONSTS = {
  maxLength: 160,
} as const;
export const PASSWORD_CONSTS = {
  minLength: 8,
  maxLength: 32,
} as const;
