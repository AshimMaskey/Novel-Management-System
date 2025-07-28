import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./components/app-sidebar";
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";
import { useEffect } from "react";
import toast from "react-hot-toast";

const AuthorLayout = () => {
  const role = useSelector((state: RootState) => state.auth.user?.role);
  const navigate = useNavigate();
  useEffect(() => {
    if (role && role === "reader") {
      toast.error("Unauthorized access!");
      navigate("/");
    }
  }, [role, navigate]);
  return (
    <SidebarProvider>
      <div className="flex h-screen">
        <AppSidebar isAuthor={true} />
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

export default AuthorLayout;
