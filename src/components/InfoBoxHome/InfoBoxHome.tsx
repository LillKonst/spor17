import CardDisplayImg from "../../images/til-home2.jpg";
import WriteCardDisplay from "../../images/til-home.jpg";

export default function InfoBoxHome() {
  return (
    <div className="bg-white p-10 my-10 rounded-lg flex flex-col gap-5 md:flex-row w-full">
      <div className="flex flex-row gap-3 md:gap-5 flex-1">
        <div className="rounded-lg">
           <img src={CardDisplayImg} alt="2 pakker med kort" className="rounded-lg hidden md:flex"/>
        </div>
        <div>
          <img src={WriteCardDisplay} alt="2 pakker med kort" className="rounded-lg"/>
        </div>
      </div>
     
      <div className="flex-1 flex flex-col justify-center text-center lg:text-left xl:mx-10">
      <h3 className="text-xl lg:text-2xl mb-4">Går du også alltid tom for julekort i desember? Med få tastetrykk kan du sikre deg for sesongen. </h3>
      <h4 className="text-md lg:text-lg mb-4">Ingen gave er komplett uten et kort med varme ord. Vi har søte motiver og det er 10 kort per pake.
      </h4>
      <h5 className="text-green-400 mb-4">ps: Kortene er designet og produsert i Norge!</h5>
      <button className="bg-green-400">Våre Julekort</button>
      </div>
    </div>
  );
}