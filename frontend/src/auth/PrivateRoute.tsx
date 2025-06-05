import Spinner from "@/components/ui/Spinner";
import type { RootState } from "@/store/store";
import type { ReactNode } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated, authChecked } = useSelector(
    (state: RootState) => state.auth
  );
  if (!authChecked)
    return (
      <>
        <div className="bg-background w-screen h-screen flex justify-center items-center">
          <Spinner />
        </div>
      </>
    );
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return <>{children}</>;
};

export default PrivateRoute;
