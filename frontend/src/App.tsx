import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import MainLayout from "./layouts/MainLayout";
import BookmarksPage from "./pages/bookmarks/BookmarksPage";
import BrowsePage from "./pages/browse/BrowsePage";
import CreatePage from "./pages/create/CreatePage";
import { ThemeProvider } from "./components/ui/theme-provider";
import ProfilePage from "./pages/profile/ProfilePage";
import NotificationPage from "./pages/notification/NotificationPage";
import SearchPage from "./pages/search/SearchPage";
import LoginPage from "./pages/LoginPage";
import PageNotFound from "./pages/PageNotFound";
import SignUpPage from "./pages/SignUpPage";
import { Toaster } from "react-hot-toast";
import PublicRoute from "./auth/PublicRoute";
const App = () => {
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route path="/create" element={<CreatePage />} />
            <Route path="/bookmarks" element={<BookmarksPage />} />
            <Route path="/browse" element={<BrowsePage />} />
            <Route path="/notifications" element={<NotificationPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/profile" element={<ProfilePage />} />
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
        </Routes>
      </ThemeProvider>
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
};

export default App;
