import BrowseSection from "../../components/BrowseSection/BrowseSection";
import MainImg from "../../components/MainImg/MainImg";
import PopularProducts from "../../components/PopularProducts/PopularProducts";
import InfoBox from "../../components/InfoBox/InfoBox";
import Reviews from "../../components/Reviews/Reviews";
// import InstagramFeed from "../../components/InstagramFeed/InstagramFeed";
// import InstagramSection from "../../components/InstagramFeed/InstagramSection";

export default function Home() {
  
  return(
    <div className="z-10 lg:px-5">
      <MainImg />
      <PopularProducts />
      <div className="flex flex-col md:flex-row md:gap-5 md:mx-5">
        <BrowseSection />
        <InfoBox />
      </div>
      <Reviews />
 
    </div>
  );
}