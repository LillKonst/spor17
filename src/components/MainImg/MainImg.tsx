import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import mainImage from "../../images/forside-red-kvalitet-fokus.JPG";
import CTAButton from "../Buttons/CTAButton";

export default function MainImg() {
  const navigate = useNavigate();

  return (
    <div className="w-full lg:px-12 flex flex-col md:flex-row mb-5 md:h-[500px] xl:max-h-[500px]">
      <Link to="/produkt/bursdagskort-ta-litt-kake-dino-10-stk" className="md:w-1/2 2xl:w-3/5 md:order-2">
        <img src={mainImage} alt="2 barn utveksler en bursdagspresant." className="md:order-1 w-full h-[300px] md:h-full object-cover"/>
      </Link>
      <div className="bg-customBlue p-5 sm:p-10 flex flex-col items-center justify-center gap-4 sm:gap-6 md:gap-10 md:h-full md:w-1/2 2xl:w-2/5">
        <h1 className="text-customWhite text-3xl sm:text-5xl text-center lg:text-5xl xl:text-7xl">Små kort. Store øyeblikk.</h1>
        <CTAButton 
          label="Handle nå"
          onClick={() => navigate("/kolleksjon/")} 
          />
      </div>
    </div>
  );
}