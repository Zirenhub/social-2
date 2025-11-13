import { Textarea } from "~/app/_components/ui/textarea";
import { Label } from "~/app/_components/ui/label";
import {
  MapPinIcon,
  AtSignIcon,
  CalendarIcon,
  AlertCircle,
} from "lucide-react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "~/app/_components/ui/input-group";
import DatePicker from "~/app/_components/date-picker";
import type { FieldError, UseFormRegisterReturn } from "react-hook-form";
import {
  BIO_CONSTS,
  LOCATION_CONSTS,
  MIN_BIRTH_DATE,
  NAME_CONSTS,
  USERNAME_CONSTS,
} from "~/constants/auth/sign-up";

type Props = {
  profileRegisters: {
    firstName: UseFormRegisterReturn<"firstName">;
    lastName: UseFormRegisterReturn<"lastName">;
    username: UseFormRegisterReturn<"username">;
    location: UseFormRegisterReturn<"location">;
    bio: UseFormRegisterReturn<"bio">;
  };
  setBirthDate: (date: Date) => void;
  errors: {
    firstName: FieldError | undefined;
    lastName: FieldError | undefined;
    username: FieldError | undefined;
    location: FieldError | undefined;
    bio: FieldError | undefined;
    birthDate: FieldError | undefined;
  };
};

function SignUpProfile({ profileRegisters, setBirthDate, errors }: Props) {
  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-tight">
        Tell us about yourself
      </h1>
      <p className="text-muted-foreground text-sm">
        Complete your profile with a few more details
      </p>

      <div className="mt-3 space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-2">
            <Label htmlFor="firstName" className="text-sm font-medium">
              First name
            </Label>
            <InputGroup>
              <InputGroupInput
                id="firstName"
                type="text"
                {...profileRegisters.firstName}
                placeholder="John"
                maxLength={NAME_CONSTS.maxLength}
                className="transition-colors"
              />
              {errors.firstName && (
                <InputGroupAddon align="inline-end">
                  <AlertCircle className="text-destructive/70 h-4 w-4" />
                </InputGroupAddon>
              )}
            </InputGroup>
            {errors.firstName && (
              <p className="text-destructive/80 mt-1.5 gap-1.5 text-xs">
                {errors.firstName.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="lastName" className="text-sm font-medium">
              Last name
            </Label>
            <InputGroup>
              <InputGroupInput
                id="lastName"
                type="text"
                {...profileRegisters.lastName}
                placeholder="Doe"
                maxLength={NAME_CONSTS.maxLength}
                className="transition-colors"
              />
              {errors.lastName && (
                <InputGroupAddon align="inline-end">
                  <AlertCircle className="text-destructive/70 h-4 w-4" />
                </InputGroupAddon>
              )}
            </InputGroup>
            {errors.lastName && (
              <p className="text-destructive/80 mt-1.5 gap-1.5 text-xs">
                {errors.lastName.message}
              </p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="username" className="text-sm font-medium">
            Username
          </Label>
          <InputGroup>
            <InputGroupAddon>
              <AtSignIcon className="h-4 w-4" />
            </InputGroupAddon>
            <InputGroupInput
              id="username"
              type="text"
              {...profileRegisters.username}
              placeholder="johndoe"
              maxLength={USERNAME_CONSTS.maxLength}
              className="transition-colors"
            />
            {errors.username && (
              <InputGroupAddon align="inline-end">
                <AlertCircle className="text-destructive/70 h-4 w-4" />
              </InputGroupAddon>
            )}
          </InputGroup>
          {errors.username && (
            <p className="text-destructive/80 mt-1.5 gap-1.5 text-xs">
              {errors.username.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label className="flex items-center gap-2 text-sm font-medium">
            <CalendarIcon className="h-4 w-4" />
            Date of birth
          </Label>
          <DatePicker
            endMonth={MIN_BIRTH_DATE}
            className="text-muted-foreground w-full"
            setBirthDate={setBirthDate}
          />
          {errors.birthDate && (
            <p className="text-destructive/80 mt-1.5 gap-1.5 text-xs">
              {errors.birthDate.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="location" className="text-sm font-medium">
            Location
          </Label>
          <InputGroup>
            <InputGroupAddon>
              <MapPinIcon className="h-4 w-4" />
            </InputGroupAddon>
            <InputGroupInput
              id="location"
              type="text"
              {...profileRegisters.location}
              placeholder="City, Country"
              maxLength={LOCATION_CONSTS.maxLength}
              className="transition-colors"
            />
            {errors.location && (
              <InputGroupAddon align="inline-end">
                <AlertCircle className="text-destructive/70 h-4 w-4" />
              </InputGroupAddon>
            )}
          </InputGroup>
          {errors.location && (
            <p className="text-destructive/80 mt-1.5 gap-1.5 text-xs">
              {errors.location.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="bio" className="text-sm font-medium">
            Bio
          </Label>
          <Textarea
            id="bio"
            placeholder="Tell us a bit about yourself..."
            {...profileRegisters.bio}
            maxLength={BIO_CONSTS.maxLength}
            className="max-h-[200px] min-h-[100px] resize-none transition-colors"
          />
          {errors.bio && (
            <p className="text-destructive/80 mt-1.5 gap-1.5 text-xs">
              {errors.bio.message}
            </p>
          )}
          <p className="text-muted-foreground text-right text-xs">
            Max {BIO_CONSTS.maxLength} characters
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignUpProfile;
