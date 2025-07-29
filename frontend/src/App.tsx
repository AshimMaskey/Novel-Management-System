import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import MainLayout from "./layouts/MainLayout";
import BookmarksPage from "./pages/bookmarks/BookmarksPage";
import BrowsePage from "./pages/browse/BrowsePage";
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
import Genre from "./pages/admin/Genre";
import Novels from "./pages/admin/Novels";
import Users from "./pages/admin/Users";
import ContactPage from "./pages/contact/ContactPage";
import AboutPage from "./pages/about/AboutPage";
import ScrollToTop from "./lib/ScrollToTop";
import NovelPage from "./pages/novel/NovelPage";
import ChapterPage from "./pages/novel/ChapterPage";
import AuthorLayout from "./layouts/AuthorLayout";
import AuthorDashboard from "./pages/author/AuthorDashboard";
import AuthorNovels from "./pages/author/AuthorNovels";
import CreateNovel from "./pages/author/CreateNovel";
import ManageChapter from "./pages/author/ManageChapter";
import CreateChapter from "./pages/author/CreateChapter";
import Reviews from "./pages/author/Reviews";
import NovelReview from "./pages/author/NovelReview";
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
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />

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
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/novel" element={<NovelPage />} />
          <Route path="/chapter" element={<ChapterPage />} />
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
          <Route
            path="/admin/genre"
            element={
              <PrivateRoute>
                <Genre />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/novels"
            element={
              <PrivateRoute>
                <Novels />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/users"
            element={
              <PrivateRoute>
                <Users />
              </PrivateRoute>
            }
          />
        </Route>
        <Route path="/author" element={<AuthorLayout />}>
          <Route
            index
            element={
              <PrivateRoute>
                <AuthorDashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/author/create"
            element={
              <PrivateRoute>
                <CreateNovel />
              </PrivateRoute>
            }
          />
          <Route
            path="/author/novels"
            element={
              <PrivateRoute>
                <AuthorNovels />
              </PrivateRoute>
            }
          />
          <Route
            path="/author/chapters"
            element={
              <PrivateRoute>
                <ManageChapter />
              </PrivateRoute>
            }
          />
          <Route
            path="/author/reviews"
            element={
              <PrivateRoute>
                <Reviews />
              </PrivateRoute>
            }
          />
          <Route
            path="/author/reviews/:id"
            element={
              <PrivateRoute>
                <NovelReview />
              </PrivateRoute>
            }
          />
          <Route
            path="/author/chapters/add"
            element={
              <PrivateRoute>
                <CreateChapter />
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
