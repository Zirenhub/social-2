import Theme from "~/app/_components/theme";
import { Button } from "~/app/_components/ui/button";
import { Input } from "~/app/_components/ui/input";

function SignInPage() {
  return (
    <div className="bg-background text-foreground flex min-h-screen w-full items-center justify-center">
      <div className="flex max-w-[350px] flex-col items-center justify-center">
        <h1 className="text-2xl font-medium">Create an account</h1>
        <p className="text-muted-foreground">
          Enter your email below to get started
        </p>

        <Input
          type="email"
          placeholder="name@example.com"
          className="my-3 w-[90%]"
        />

        <div className="bg-muted h-1 w-full" />

        <Button className="my-4 w-[90%] font-semibold">Continue</Button>

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
      </div>

      <div className="absolute right-5 bottom-5">
        <Theme />
      </div>
    </div>
  );
}

export default SignInPage;
