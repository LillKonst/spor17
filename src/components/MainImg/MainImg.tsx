import { Link } from "react-router-dom";
import produkt1 from "../../images/Julekort-by.png";
import produkt2 from "../../images/Julekort-juletre.png";
import produkt3 from "../../images/Julekort-jente.png";
import produkt4 from "../../images/Julekort-pakker.png";
import produkt5 from "../../images/Julekort-venterpånissen.png";
import produkt6 from "../../images/Julekort-hus.png";
import produkt7 from "../../images/Julekort-snømann.png";
import produkt8 from "../../images/Julekort-misteltein.png";

export default function MainImg() {
  return(
    <div className="bg-white w-full rounded m-0 p-2 xxs:p-5 xs:p-8 md:px-12">
      <Link to="/AllProducts" className="lg:px-12 grid grid-cols-6 auto-rows-auto md:grid-rows-2 gap-1">
        <img src={produkt1} alt="" className="col-span-2 md:col-span-1 row-span-1"/>
        <img src={produkt2} alt="" className="col-span-2 md:col-span-1 row-span-1"/>
        <img src={produkt3} alt="" className="col-span-2 md:col-span-1 row-span-1"/>
        <img src={produkt4} alt="" className="col-span-2 md:col-span-1 row-span-1"/>
        <img src={produkt5} alt="" className="col-span-2 md:col-span-1 row-span-1"/>
        <img src={produkt6} alt="" className="col-span-2 md:col-span-1 row-span-1"/>
        <div className="col-span-6 md:col-span-4 p-1 xxs:p-3 sm:p-5 flex flex-col justify-center">
          <h1 className="text-2xl xxxs:text-4xl sm:text-6xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl">DEN ENKLE SERIEN</h1>
          <h2 className="text-sm xxxs:text-xl xs:text-2xl sm:text-3xl md:text-2xl lg:text-4xl 2xl:text-5xl">ENKLE OG SØTE JULEKORT 2025</h2>
        </div>
        <img src={produkt7} alt="" className="col-span-3 md:col-span-1 row-span-2"/>
        <img src={produkt8} alt="" className="col-span-3 md:col-span-1 row-span-2"/>
      </Link>
    </div>
  );
}