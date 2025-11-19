import type React from "react";
import { TRPCReactProvider } from "~/trpc/react";
import { ThemeProvider } from "next-themes";
import { ToastContainer } from "react-toastify";
import { SidebarProvider } from "~/components/ui/sidebar";

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
        <SidebarProvider>{children}</SidebarProvider>
        <ToastContainer />
      </ThemeProvider>
    </TRPCReactProvider>
  );
}

export default Providers;
