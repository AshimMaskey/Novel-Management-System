import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import MainLayout from "./layouts/MainLayout";
import BookmarksPage from "./pages/bookmarks/BookmarksPage";
import BrowsePage from "./pages/browse/BrowsePage";
import CreatePage from "./pages/create/CreatePage";
import ProfilePage from "./pages/profile/ProfilePage";
import NotificationPage from "./pages/notification/NotificationPage";
import SearchPage from "./pages/search/SearchPage";
import LoginPage from "./pages/LoginPage";
import PageNotFound from "./pages/PageNotFound";
import SignUpPage from "./pages/SignUpPage";
import { Toaster } from "react-hot-toast";
import PublicRoute from "./auth/PublicRoute";
import PrivateRoute from "./auth/PrivateRoute";
import { useGetUserQuery } from "./features/auth/authApi";
import Spinner from "./components/ui/Spinner";
import { useDispatch } from "react-redux";
import { clearUser, setUser } from "./features/auth/authSlice";
import { useEffect } from "react";
import JoinPage from "./pages/create/JoinPage";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminLayout from "./layouts/AdminLayout";
const App = () => {
  const { data, error, isLoading, isFetching } = useGetUserQuery();
  const dispatch = useDispatch();

  useEffect(() => {
    if (data) {
      dispatch(setUser(data));
    }
  }, [data, dispatch]);

  useEffect(() => {
    if (error) {
      dispatch(clearUser());
    }
  }, [error, dispatch]);

  if (isLoading || isFetching)
    return (
      <>
        <div className="bg-background w-screen h-screen flex justify-center items-center">
          <Spinner />
        </div>
      </>
    );
  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route
            path="/create"
            element={
              <PrivateRoute>
                <CreatePage />
              </PrivateRoute>
            }
          />
          <Route
            path="/join"
            element={
              <PrivateRoute>
                <JoinPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/bookmarks"
            element={
              <PrivateRoute>
                <BookmarksPage />
              </PrivateRoute>
            }
          />
          <Route path="/browse" element={<BrowsePage />} />
          <Route
            path="/notifications"
            element={
              <PrivateRoute>
                <NotificationPage />
              </PrivateRoute>
            }
          />
          <Route path="/search" element={<SearchPage />} />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <ProfilePage />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<PageNotFound />} />
        </Route>
        <Route
          path="/login"
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <PublicRoute>
              <SignUpPage />
            </PublicRoute>
          }
        />
        <Route path="/admin" element={<AdminLayout />}>
          <Route
            index
            element={
              <PrivateRoute>
                <AdminDashboard />
              </PrivateRoute>
            }
          />
        </Route>
      </Routes>
      <Toaster position="top-center" />
    </>
  );
};

export default App;
