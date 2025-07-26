import { AuthorSection } from "./AuthorSection";
import { FeaturedNovels } from "./FeaturedNovels";
import { HeroSection } from "./HeroSection";
import TopTags from "./TopTags";

const HomePage = () => {
  return (
    <>
      <HeroSection />
      <FeaturedNovels />
      <TopTags />
      <AuthorSection />
    </>
  );
};

export default HomePage;
