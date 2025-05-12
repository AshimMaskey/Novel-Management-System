import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import MainLayout from "./layouts/MainLayout";
import BookmarksPage from "./pages/bookmarks/BookmarksPage";
import BrowsePage from "./pages/browse/BrowsePage";
import CreatePage from "./pages/create/CreatePage";
const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/create" element={<CreatePage />} />
          <Route path="/bookmarks" element={<BookmarksPage />} />
          <Route path="/browse" element={<BrowsePage />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
