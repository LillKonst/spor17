import { Link } from "react-router-dom";
// import produkt1 from "../../images/Julekort-by.png";
// import produkt2 from "../../images/Julekort-juletre.png";
// import produkt3 from "../../images/Julekort-jente.png";
// import produkt4 from "../../images/Julekort-pakker.png";
// import produkt5 from "../../images/Julekort-venterpånissen.png";
// import produkt6 from "../../images/Julekort-hus.png";
// import produkt7 from "../../images/Julekort-snømann.png";
// import produkt8 from "../../images/Julekort-misteltein.png";

// export default function MainImg() {
//   return(
//     <div className="bg-white w-full rounded m-0 p-2 xxs:p-5 xs:p-8 md:px-12">
//       <Link to="/produkter" className="lg:px-12 grid grid-cols-6 auto-rows-auto md:grid-rows-2 gap-1">
//         <img src={produkt1} alt="" className="col-span-1 row-span-1"/>
//         <img src={produkt2} alt="" className="col-span-1 row-span-1"/>
//         <img src={produkt3} alt="" className="col-span-1 row-span-1"/>
//         <img src={produkt4} alt="" className="col-span-1 row-span-1"/>
//         <img src={produkt5} alt="" className="col-span-1 row-span-1"/>
//         <img src={produkt6} alt="" className="col-span-1 row-span-1"/>
//         <div className="col-span-4 p-1 xxs:p-3 sm:p-5 flex flex-col justify-center">
//           <h1 className="text-xl sm:text-6xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl">DEN ENKLE SERIEN</h1>
//           <h2 className="xxxs:text-md xs:text-2xl sm:text-3xl md:text-2xl lg:text-4xl 2xl:text-5xl">ENKLE OG SØTE JULEKORT 2025</h2>
//         </div>
//         <img src={produkt7} alt="" className="col-span-1 row-span-1"/>
//         <img src={produkt8} alt="" className="col-span-1 row-span-1"/>
        
//       </Link>
//     </div>
//   );
// }

import { useNavigate } from "react-router-dom";
import mainImage from "../../images/forside-red-kvalitet.JPG";
import CTAButton from "../Buttons/CTAButton";

export default function MainImg() {
  const navigate = useNavigate();

  return (
    <div className="w-full lg:px-12 flex flex-col md:flex-row mb-5 md:h-[500px] xl:max-h-[500px]">
      <Link to="/produkt/bursdagskort-ta-litt-kake-dino-10-stk" className="md:w-1/2 2xl:w-3/5 md:order-2">
        <img src={mainImage} alt="2 barn utveksler en bursdagspresant." className="md:order-1 w-full md:h-full object-cover"/>
      </Link>
      <div className="bg-customBlue p-10 flex flex-col items-center justify-center gap-6 md:gap-10 md:h-full md:w-1/2 2xl:w-2/5">
        <h1 className="text-customWhite text-5xl text-center lg:text-5xl xl:text-7xl">Barnebursdag for alle penga!</h1>
        <CTAButton 
          label="Handle nå"
          onClick={() => navigate("/kort")} />
      </div>
    </div>
  );
}