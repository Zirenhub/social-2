"use client";
import { useTransition } from "react";
import { cn } from "~/lib/utils";
import { Button } from "../ui/button";
import { DropdownMenuItem } from "../ui/dropdown-menu";
import { signOut } from "next-auth/react";
import { Loader2, LogOut } from "lucide-react";

type Props = {
  className?: string;
  asDropdownItem?: boolean;
};

function SignOutButton({ className, asDropdownItem }: Props) {
  const [isPending, startTransition] = useTransition();

  const handleSignOut = () => {
    startTransition(async () => {
      await signOut({ callbackUrl: "/" });
    });
  };

  const content = (
    <>
      {isPending ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <LogOut className="h-4 w-4" />
      )}
      {isPending ? "Signing out..." : "Sign Out"}
    </>
  );

  if (asDropdownItem) {
    return (
      <DropdownMenuItem
        onClick={handleSignOut}
        disabled={isPending}
        className={cn("cursor-pointer", className)}
      >
        {content}
      </DropdownMenuItem>
    );
  }

  return (
    <Button
      onClick={handleSignOut}
      disabled={isPending}
      className={cn("cursor-pointer", className)}
    >
      {content}
    </Button>
  );
}

export default SignOutButton;
