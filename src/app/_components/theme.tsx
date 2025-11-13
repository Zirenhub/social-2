"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Moon, Sun } from "lucide-react";
import { cn } from "~/lib/utils";

type Props = {
  className?: string;
};

function Theme({ className }: Props) {
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Prevents SSR/client mismatch
    return <Button variant="outline" size="icon" aria-label="Toggle theme" />;
  }

  return (
    <Button
      className={cn(
        "dark:bg-background outline-accent-background cursor-pointer",
        className,
      )}
      variant="outline"
      size="icon"
      aria-label="Toggle theme"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {theme === "dark" ? <Sun /> : <Moon />}
    </Button>
  );
}

export default Theme;
