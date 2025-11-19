import type { FieldError, UseFormRegisterReturn } from "react-hook-form";
import { Label } from "~/components/ui/label";
import { AlertCircle } from "lucide-react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "~/components/ui/input-group";

type Props = {
  passwordRegisters: {
    passwordRegister: UseFormRegisterReturn<"password">;
    confirmPasswordRegister: UseFormRegisterReturn<"confirmPassword">;
  };
  errors: {
    password: FieldError | undefined;
    confirmPassword: FieldError | undefined;
  };
};

function SignUpPassword({ passwordRegisters, errors }: Props) {
  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-tight">
        Create your password
      </h1>
      <p className="text-muted-foreground text-sm">
        Choose a strong password to secure your account
      </p>

      <div className="mt-3 space-y-3">
        <div className="space-y-2">
          <Label htmlFor="password" className="text-sm font-medium">
            Password
          </Label>
          <InputGroup>
            <InputGroupInput
              {...passwordRegisters.passwordRegister}
              id="password"
              type="password"
              placeholder="Enter your password"
              className="transition-colors"
            />
            {errors.password && (
              <InputGroupAddon align="inline-end">
                <AlertCircle className="text-destructive/70 h-4 w-4" />
              </InputGroupAddon>
            )}
          </InputGroup>
          {errors.password && (
            <p className="text-destructive/80 mt-1.5 flex items-center gap-1.5 text-xs">
              {errors.password.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirmPassword" className="text-sm font-medium">
            Confirm password
          </Label>
          <InputGroup>
            <InputGroupInput
              {...passwordRegisters.confirmPasswordRegister}
              id="confirmPassword"
              type="password"
              placeholder="Re-enter your password"
              className="transition-colors"
            />
            {errors.confirmPassword && (
              <InputGroupAddon align="inline-end">
                <AlertCircle className="text-destructive/70 h-4 w-4" />
              </InputGroupAddon>
            )}
          </InputGroup>
          {errors.confirmPassword && (
            <p className="text-destructive/80 mt-1.5 flex items-center gap-1.5 text-xs">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default SignUpPassword;
