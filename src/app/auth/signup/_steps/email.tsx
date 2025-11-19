import type { FieldError, UseFormRegisterReturn } from "react-hook-form";
import { Label } from "~/components/ui/label";
import { AlertCircle } from "lucide-react";
import { cn } from "~/lib/utils";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "~/components/ui/input-group";

type Props = {
  emailRegister: UseFormRegisterReturn<"email">;
  errors: FieldError | undefined;
};

function SignUpEmail({ emailRegister, errors }: Props) {
  const showError = errors && errors.type !== "invalid_string";

  return (
    <div className="w-[90%]">
      <h1 className="text-2xl font-semibold tracking-tight">
        Create an account
      </h1>
      <p className="text-muted-foreground text-sm">
        Enter your email below to get started
      </p>

      <div className="mt-3 space-y-1">
        <Label htmlFor="email" className="text-sm font-medium">
          Email address
        </Label>
        <InputGroup>
          <InputGroupInput
            {...emailRegister}
            id="email"
            type="email"
            placeholder="name@example.com"
            className={cn(
              "transition-colors",
              showError &&
                "border-destructive/50 focus-visible:ring-destructive/20",
            )}
          />
          {showError && (
            <InputGroupAddon align="inline-end">
              <AlertCircle className="text-destructive/70 h-4 w-4" />
            </InputGroupAddon>
          )}
        </InputGroup>
        {showError && (
          <p className="text-destructive/80 mt-1.5 gap-1.5 text-center text-xs">
            {errors.message}
          </p>
        )}
      </div>
    </div>
  );
}

export default SignUpEmail;
