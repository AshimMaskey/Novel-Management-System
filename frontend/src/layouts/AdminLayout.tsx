import type { RootState } from "@/store/store";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

const AdminLayout = () => {
  const role = useSelector((state: RootState) => state.auth.user?.role);
  const navigate = useNavigate();
  useEffect(() => {
    if (role && role !== "admin") {
      toast.error("Unauthorized access!");
      navigate("/");
    }
  }, [role, navigate]);
  return (
    <div>
      <p>he</p>
      <Outlet />
    </div>
  );
};

export default AdminLayout;
