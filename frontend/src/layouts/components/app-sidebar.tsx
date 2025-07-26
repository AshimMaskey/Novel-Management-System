import {
  BookOpen,
  Calendar,
  Home,
  Inbox,
  Search,
  Tag,
  Users,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link } from "react-router-dom";

const items = [
  { title: "Dashboard", url: "/admin", icon: Home },
  { title: "Novels", url: "/admin/novels", icon: BookOpen },
  { title: "Users", url: "/admin/users", icon: Users },
  { title: "Inbox", url: "/admin/inbox", icon: Inbox },
  { title: "Calendar", url: "/admin/calendar", icon: Calendar },
  { title: "Search", url: "/admin/search", icon: Search },
  { title: "Genre", url: "/admin/genre", icon: Tag },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-lg text-primary font-bold">
            Admin Panel
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link to={item.url} className="flex items-center gap-2">
                      <item.icon className="w-4 h-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
