import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, Outlet } from "react-router-dom";
import toast from "react-hot-toast";
import type { RootState } from "@/store/store";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./components/app-sidebar";

const AdminLayout = () => {
  const role = useSelector((state: RootState) => state?.auth.user?.role);
  const navigate = useNavigate();

  useEffect(() => {
    if (role && role !== "admin") {
      toast.error("Unauthorized access!");
      navigate("/");
    }
  }, [role, navigate]);

  if (!role) return null;

  return (
    <SidebarProvider>
      <div className="flex h-screen">
        <AppSidebar isAuthor={false} />
        <main className="flex-1 p-5 overflow-y-auto">
          <SidebarTrigger className="mb-4" />
          <div className="ml-2">
            <Outlet />
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default AdminLayout;
