import BrowseSection from "../../components/BrowseSection/BrowseSection";
import InfoBoxHome from "../../components/Reviews/Reviews";
import MainImg from "../../components/MainImg/MainImg";
import PopularProducts from "../../components/PopularProducts/PopularProducts";
// import InstagramFeed from "../../components/InstagramFeed/InstagramFeed";
// import InstagramSection from "../../components/InstagramFeed/InstagramSection";

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