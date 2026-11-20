import HomeNavbar from "../../components/home/HomeNavbar.jsx";
import HeroCarousel from "../../components/home/HeroCarousel.jsx";
import HomeIntroCard from "../../components/home/HomeIntroCard.jsx";
import HomeStats from "../../components/home/HomeStats.jsx";
import HomeAbout from "../../components/home/HomeAbout.jsx";
import HomeBento from "../../components/home/HomeBento.jsx";
import SiteFooter from "../../components/home/SiteFooter.jsx";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#F5F4EF] font-sans text-[#00112C]">
      <HeroCarousel>
        <HomeNavbar />
      </HeroCarousel>
      <HomeIntroCard />
      <HomeStats />
      <HomeAbout />
      <HomeBento />
      <SiteFooter />
    </div>
  );
}
