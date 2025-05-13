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
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </ThemeProvider>
    </>
  );
};

export default App;
