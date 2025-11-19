"use client";

import { Button } from "~/components/ui/button";
import SignUpEmail from "./_steps/email";
import { useState } from "react";
import SignUpPassword from "./_steps/password";
import useSignUp from "~/hooks/useSignUp";
import SignUpProfile from "./_steps/profile";
import { Separator } from "~/components/ui/separator";
import { ROUTES } from "~/constants/routes";
import Link from "next/link";

function SignUpPage() {
  const [step, setStep] = useState(1);

  const {
    register,
    watch,
    setValue,
    triggerEmailCheck,
    isSubmitting,
    formState: { errors, isValidating, isSubmitSuccessful },
    onSubmit,
  } = useSignUp();

  const canContinue = () => {
    switch (step) {
      case 1:
        return !errors.email && watch("email").length > 0;
      case 2:
        return (
          !errors.password &&
          !errors.confirmPassword &&
          watch("password").length > 0 &&
          watch("confirmPassword").length > 0
        );
      case 3:
        return (
          !errors.firstName &&
          !errors.lastName &&
          !errors.username &&
          !errors.location &&
          !errors.bio &&
          !errors.birthDate &&
          watch("firstName").length > 0 &&
          watch("lastName").length > 0 &&
          watch("username").length > 0
        );
      default:
        return false;
    }
  };

  function isLoading() {
    return isSubmitting || isValidating || isSubmitSuccessful;
  }

  const nextStep = async () => {
    if (step === 1) {
      await triggerEmailCheck();
    }
    if (step < 3 && canContinue()) {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const emailRegister = register("email");
  const passwordsRegister = {
    passwordRegister: register("password"),
    confirmPasswordRegister: register("confirmPassword"),
  };
  const profileRegister = {
    firstName: register("firstName"),
    lastName: register("lastName"),
    username: register("username"),
    location: register("location"),
    bio: register("bio"),
  };

  return (
    <>
      {/* if step is 1 then show login button */}
      {step === 1 && (
        <Link href={ROUTES.LOGIN}>
          <Button
            variant="link"
            className="bg-background text-foreground fixed top-5 right-5 cursor-pointer p-3"
          >
            Log In
          </Button>
        </Link>
      )}

      <form
        onSubmit={onSubmit}
        className="flex max-w-[350px] flex-col items-center justify-center"
      >
        {step === 1 && (
          <SignUpEmail emailRegister={emailRegister} errors={errors.email} />
        )}
        {step === 2 && (
          <SignUpPassword
            passwordRegisters={{ ...passwordsRegister }}
            errors={{
              password: errors.password,
              confirmPassword: errors.confirmPassword,
            }}
          />
        )}
        {step === 3 && (
          <SignUpProfile
            profileRegisters={{ ...profileRegister }}
            setBirthDate={(date: Date) =>
              setValue("birthDate", date, {
                shouldValidate: true,
                shouldDirty: true,
              })
            }
            errors={{
              firstName: errors.firstName,
              lastName: errors.lastName,
              username: errors.username,
              location: errors.location,
              bio: errors.bio,
              birthDate: errors.birthDate,
            }}
          />
        )}

        <Separator className="bg-muted my-3 w-full" />

        {errors.root && (
          <p className="text-destructive/80 mt-1.5 mb-3 gap-1.5 text-center text-xs">
            {errors.root.message}
          </p>
        )}
        {/* push back to related step  */}

        <Button
          onClick={nextStep}
          type={step < 3 ? "button" : "submit"}
          className="disabled:bg-muted-foreground mb-3 w-[90%] cursor-pointer font-semibold"
          disabled={!canContinue() || isLoading()}
        >
          {step === 1 && isLoading()
            ? "Checking..."
            : step < 3
              ? "Continue"
              : isLoading()
                ? "Signing Up..."
                : "Sign Up"}
        </Button>
        {step > 1 && (
          <Button
            onClick={prevStep}
            type="button"
            className="bg-background text-foreground hover:text-foreground hover:bg-accent mb-2 w-[90%] cursor-pointer font-semibold opacity-75 ring"
          >
            Back
          </Button>
        )}

        <p className="text-muted-foreground text-center">
          By clicking continue, you agree to our{" "}
          <span className="hover:text-foreground cursor-pointer underline">
            Terms of Service
          </span>{" "}
          and{" "}
          <span className="hover:text-foreground cursor-pointer underline">
            Privacy Policy.
          </span>
        </p>
      </form>
    </>
  );
}

export default SignUpPage;
