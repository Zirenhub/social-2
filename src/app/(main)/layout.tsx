import { AppSidebar } from "../_components/sidebar";
import Theme from "../_components/theme";
import { SidebarTrigger } from "../_components/ui/sidebar";

export default async function MainLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex">
      <AppSidebar />
      <div className="flex w-full flex-col">
        <div className="bg-background/95 supports-backdrop-filter:bg-background/60 sticky top-0 z-40 flex items-center justify-between border-b px-4 py-2 backdrop-blur">
          <SidebarTrigger className="h-fit w-fit cursor-pointer p-3" />
          <Theme className="h-fit w-fit border-0 bg-transparent p-3 shadow-none dark:bg-transparent" />
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
}
