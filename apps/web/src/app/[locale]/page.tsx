import AboutUsSection from "../../components/sections/aboutus/page";
import FeaturedSection from "../../components/sections/featured/page";
import HeroSection from "../../components/sections/hero/page";

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <AboutUsSection />
      <FeaturedSection />
    </main>
  );
}
