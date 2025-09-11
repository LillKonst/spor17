import produkt1 from "../../images/motiv-by.png";
import produkt2 from "../../images/motiv-juletre.png";
import produkt3 from "../../images/motiv-misteltein.png";
import produkt4 from "../../images/motiv-pakker.png";
import produkt5 from "../../images/motiv-venter.png";
import produkt6 from "../../images/motiv-roodthus.png";
import produkt7 from "../../images/motiv-snoomann.png";
import produkt8 from "../../images/motiv-jente.png";


export default function Home() {
  return(
    <div>
      <div className="bg-white grid grid-cols-6 grid-rows-2 gap-1 p-12 m-0 rounded-lg">
        <img src={produkt1} alt=""/>
        <img src={produkt2} alt=""/>
        <img src={produkt3} alt=""/>
        <img src={produkt4} alt=""/>
        <img src={produkt5} alt=""/>
        <img src={produkt6} alt=""/>
        <div className="col-span-4 p-5 flex flex-col justify-center">
          <h1 className="text-6xl">DEN ENKLE SERIEN</h1>
          <h2 className="text-3xl">ENKLE OG SØTE JULEKORT 2025</h2>
        </div>
        <img src={produkt7} alt=""/>
        <img src={produkt8} alt=""/>
      </div>
    </div>
  );
}