import { AuthorSection } from "./AuthorSection";
import { FeaturedNovels } from "./FeaturedNovels";
import { HeroSection } from "./HeroSection";
import RecommendationSection from "./RecommendationSection";
import TopTags from "./TopTags";

const HomePage = () => {
  return (
    <>
      <HeroSection />
      <RecommendationSection />
      <TopTags />
      <AuthorSection />
      <FeaturedNovels />
    </>
  );
};

export default HomePage;
