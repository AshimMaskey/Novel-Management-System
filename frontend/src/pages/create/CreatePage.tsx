import type { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const CreatePage = () => {
  const role = useSelector((state: RootState) => state.auth.user?.role);
  if (role === "reader") {
    return <Navigate to="/join" />;
  }
  return <div>CreatePage</div>;
};

export default CreatePage;
