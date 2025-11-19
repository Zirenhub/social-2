import { AppSidebar } from "~/components/sidebar";
import Theme from "~/components/theme";
import { SidebarTrigger } from "~/components/ui/sidebar";

export default async function MainLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <AppSidebar />
      <div className="flex h-screen min-w-0 flex-1 flex-col">
        <header className="bg-background supports-[backdrop-filter]:bg-background/80 sticky top-0 z-50 flex h-14 items-center justify-between border-b px-6 backdrop-blur-sm">
          <SidebarTrigger className="h-fit w-fit cursor-pointer p-3" />
          <Theme className="h-fit w-fit border-0 bg-transparent p-3 shadow-none dark:bg-transparent" />
        </header>
        <div className="flex-1 overflow-auto">{children}</div>
      </div>
    </>
  );
}
