"use client";

import {
  Bell,
  Bookmark,
  HelpCircle,
  Home,
  MessageCircle,
  MoreHorizontal,
  Settings,
  User,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "~/components/ui/sidebar";
import Theme from "./theme";
import SignOutButton from "./auth/signout-button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "~/components/ui/avatar";
import { cn } from "~/lib/utils";
import { Button } from "~/components/ui/button";

const menuItems = [
  { title: "Home", icon: Home, url: "#" },
  { title: "Explore", icon: Bookmark, url: "#" },
  { title: "Messages", icon: MessageCircle, url: "#" },
  { title: "Notifications", icon: Bell, url: "#" },
  { title: "Profile", icon: User, url: "#" },
];

export function AppSidebar() {
  const { state } = useSidebar();

  return (
    <Sidebar
      collapsible="icon"
      className="border-sidebar-border bg-sidebar border-r"
    >
      <SidebarGroup className="py-6">
        <div className="flex items-center gap-2 px-2 py-2">
          <div className="bg-sidebar-primary text-sidebar-primary-foreground flex h-8 w-8 items-center justify-center rounded-md text-sm font-bold">
            S
          </div>
          <span className="text-sm font-semibold group-data-[collapsible=icon]:hidden">
            Social
          </span>
        </div>
      </SidebarGroup>

      <SidebarContent>
        <SidebarGroup className="gap-4">
          <SidebarGroupLabel className="text-sidebar-foreground/60 text-md font-semibold tracking-wider uppercase">
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="gap-2 group-data-[collapsible=icon]:items-center">
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className="hover:bg-sidebar-accent hover:text-sidebar-accent-foreground h-12 rounded-lg px-3 transition-all duration-200"
                  >
                    <a href={item.url} className="cursor-pointer">
                      <item.icon
                        className={cn(
                          state === "expanded" && "min-h-5 min-w-5",
                        )}
                      />
                      <span className="text-lg">{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-sidebar-border border-t py-4">
        <SidebarMenu className="gap-2">
          <SidebarMenuItem className="mb-2">
            <div className="flex items-center justify-between px-2 py-2 group-data-[collapsible=icon]:justify-center">
              <div className="flex min-w-0 items-center gap-3 group-data-[collapsible=icon]:hidden">
                <Avatar className="h-9 w-9">
                  <AvatarFallback className="bg-sidebar-primary text-sidebar-primary-foreground font-semibold">
                    JD
                  </AvatarFallback>
                </Avatar>
                <div className="flex min-w-0 flex-col">
                  <span className="text-sidebar-foreground truncate text-sm font-semibold">
                    John Doe
                  </span>
                  <span className="text-sidebar-foreground/60 truncate text-xs">
                    @johndoe
                  </span>
                </div>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    size="icon"
                    className="hover:bg-sidebar-accent bg-sidebar hover:text-sidebar-accent-foreground text-sidebar-foreground/70 ml-auto rounded-lg p-2 transition-colors duration-200"
                  >
                    <MoreHorizontal className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent side="right" align="end" className="w-48">
                  <DropdownMenuItem className="cursor-pointer gap-2">
                    <Settings className="h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer gap-2">
                    <HelpCircle className="h-4 w-4" />
                    <span>Help & Support</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <SignOutButton asDropdownItem />
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
