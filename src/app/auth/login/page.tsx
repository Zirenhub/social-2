"use client";

import { Label } from "~/app/_components/ui/label";
import { Button } from "~/app/_components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "~/app/_components/ui/input-group";
import { Separator } from "~/app/_components/ui/separator";
import { ROUTES } from "~/constants/routes";
import { cn } from "~/lib/utils";
import useLogin from "~/hooks/useLogin";
import { AlertCircle } from "lucide-react";
import Link from "next/link";

function LoginPage() {
  const {
    onSubmit,
    register,
    isSubmitting,
    watch,
    formState: { errors },
  } = useLogin();

  function hasErrors() {
    return Object.keys(errors).filter((key) => key !== "root").length > 0;
  }

  const emailIsEmpty = watch("email").length === 0;
  const passwordIsEmpty = watch("password").length === 0;
  console.log(errors);

  const showEmailError = errors.email && errors.email.type !== "invalid_string";
  const rootError = errors.root?.message;
  const isSubmitable =
    !isSubmitting && !emailIsEmpty && !passwordIsEmpty && !hasErrors();

  return (
    <>
      <Link href={ROUTES.SIGNUP}>
        <Button
          variant="link"
          className="bg-background text-foreground fixed top-5 right-5 cursor-pointer p-3"
        >
          Sign Up
        </Button>
      </Link>

      <form
        onSubmit={onSubmit}
        className="flex max-w-[350px] flex-col items-center justify-center"
      >
        <div className="w-[90%]">
          <h1 className="text-2xl font-semibold tracking-tight">
            Welcome back!
          </h1>
          <p className="text-muted-foreground text-sm">
            Enter your details to sign in to your account.
          </p>
        </div>

        <div className="mt-3 w-[90%] space-y-1">
          <Label htmlFor="email" className="text-sm font-medium">
            Email address
          </Label>
          <InputGroup>
            <InputGroupInput
              {...register("email")}
              id="email"
              type="email"
              placeholder="name@example.com"
              className={cn(
                "transition-colors",
                showEmailError &&
                  "border-destructive/50 focus-visible:ring-destructive/20",
              )}
            />
            {showEmailError && (
              <InputGroupAddon align="inline-end">
                <AlertCircle className="text-destructive/70 h-4 w-4" />
              </InputGroupAddon>
            )}
          </InputGroup>
          {showEmailError && errors.email?.message && (
            <p className="text-destructive/80 mt-1.5 gap-1.5 text-center text-xs">
              {errors.email.message}
            </p>
          )}
        </div>

        <div className="mt-3 w-[90%] space-y-1">
          <Label htmlFor="password" className="text-sm font-medium">
            Password
          </Label>
          <InputGroup>
            <InputGroupInput
              {...register("password")}
              id="password"
              type="password"
              placeholder="Enter your password"
              className={cn(
                "transition-colors",
                errors.password &&
                  "border-destructive/50 focus-visible:ring-destructive/20",
              )}
            />
            {errors.password && (
              <InputGroupAddon align="inline-end">
                <AlertCircle className="text-destructive/70 h-4 w-4" />
              </InputGroupAddon>
            )}
          </InputGroup>
          {errors.password && (
            <p className="text-destructive/80 mt-1.5 gap-1.5 text-center text-xs">
              {errors.password.message}
            </p>
          )}
        </div>

        <Separator className="bg-muted my-3 w-full" />
        {rootError && (
          <p className="text-destructive/80 mt-1.5 mb-3 gap-1.5 text-center text-xs">
            {rootError}
          </p>
        )}
        <Button
          disabled={!isSubmitable}
          type="submit"
          className="disabled:bg-muted-foreground mb-3 w-[90%] cursor-pointer font-semibold"
        >
          Login
        </Button>
        <p className="text-muted-foreground text-center">
          By clicking login, you agree to our{" "}
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

export default LoginPage;
