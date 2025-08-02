import { BookOpen, FileText, Home, Plus, Star, Tag, Users } from "lucide-react";
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

interface AppSidebarProps {
  isAuthor: boolean;
}

const adminItems = [
  { title: "Dashboard", url: "/admin", icon: Home },
  { title: "Novels", url: "/admin/novels", icon: BookOpen },
  { title: "Users", url: "/admin/users", icon: Users },
  // { title: "Search", url: "/admin/search", icon: Search },
  { title: "Genre", url: "/admin/genre", icon: Tag },
];
const authorItems = [
  { title: "Dashboard", icon: Home, url: "/author" },
  { title: "My Novels", icon: BookOpen, url: "/author/novels" },
  { title: "Create Novel", icon: Plus, url: "/author/create" },
  { title: "Manage Chapter", icon: FileText, url: "/author/chapters" },
  { title: "Reviews", icon: Star, url: "/author/reviews" },
];

export function AppSidebar({ isAuthor }: AppSidebarProps) {
  const items = isAuthor ? authorItems : adminItems;

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-lg text-primary font-bold">
            {isAuthor ? "Author Dashboard" : "Admin Dashboard"}
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
