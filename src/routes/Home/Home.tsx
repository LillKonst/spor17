import BrowseSection from "../../components/BrowseSection/BrowseSection";
import MainImg from "../../components/MainImg/MainImg";
import PopularProducts from "../../components/PopularProducts/PopularProducts";
import InfoBox from "../../components/InfoBox/InfoBox";
import Reviews from "../../components/Reviews/Reviews";
import TopInfo from "../../components/TopInfo/TopInfo";
import Favorite from "../../components/Favorite/Favorite";
// import InstagramFeed from "../../components/InstagramFeed/InstagramFeed";
// import InstagramSection from "../../components/InstagramFeed/InstagramSection";

export default function Home() {
  
  return(
    <div className="z-10 lg:px-5">
      <TopInfo />
      <MainImg />
      <BrowseSection />
      <div id="populære-kort">
        <PopularProducts/>
      </div>
      
      <div id="vår-favoritt" className="flex flex-col md:flex-row md:gap-5 md:mx-5">
        <InfoBox />
        <Favorite />
      </div>
      <Reviews />
 
    </div>
  );
}