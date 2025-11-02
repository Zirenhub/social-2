import type React from "react";
import { TRPCReactProvider } from "~/trpc/react";
import { ThemeProvider } from "next-themes";

type Props = {
  children: React.ReactNode;
};

function Providers({ children }: Props) {
  return (
    <TRPCReactProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        {children}
      </ThemeProvider>
    </TRPCReactProvider>
  );
}

export default Providers;
