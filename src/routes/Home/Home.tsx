import BrowseSection from "../../components/BrowseSection/BrowseSection";
import InfoBoxHome from "../../components/Reviews/Reviews";
import MainImg from "../../components/MainImg/MainImg";
import PopularProducts from "../../components/PopularProducts/PopularProducts";

export default function Home() {
  
  return(
    <div className="z-10 lg:px-5">
      <MainImg />
      <BrowseSection />
      <PopularProducts />
      <InfoBoxHome />
    </div>
  );
}