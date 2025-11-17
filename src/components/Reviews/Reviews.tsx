import WriteCardDisplay from "../../images/IMG_1075-200kb.jpg";

export default function Reviews() {
  return (
    <div className="bg-white sm:p-5 my-10 rounded-lg flex flex-col gap-5 lg:flex-row w-full lg:px-20 self-center justify-center items-center">
      <div className="w-full relative md:max-w-[450px]">
        <img src={WriteCardDisplay} alt="2 pakker med kort" className="w-full md:rounded"/>
        <div className="absolute top-[15%] left-[4%] right-[43%]">
          <h3 className="font-bold text-[1vh] xxxs:text-[2vh] xs:text-[3vh] sm:text-2xl">
          Skriv noen varme ord til de du er glad i  
        </h3>
        </div>
        
      </div>

     
      <div className="flex-1 flex-col justify-center text-center lg:text-left xs:mx-5 xl:mx-10 ">
      <h2 className="text-2xl m-5">Hvorfor folk elsker julekortene fra spor 17</h2>
      <div>
        <ul className="flex flex-col gap-8">
          <li className="mx-5">
            <h3 className="text-xl">Rolige estetiske motiver</h3>
            <p>Kortene har en varme og ro som passer til enhver mottaker</p>
          </li>
          <li className="mx-5">
            <h3 className="text-xl">Perfekt for familie, venner og kollegaer</h3>
            <p>10 kort gir deg mulighet til å spre mange hyggelige julehilsener.</p>
          </li>
          <li className="mx-5">
            <h3 className="text-xl">Enkle å skrive på</h3>
            <p>Matte overflater gjør at blekk ikke smitter eller flyter ut.</p>
          </li>
          <li className="mx-5">
            <h3 className="text-xl">Støtt en liten bedrift</h3>
            <p>Kortene er designet med juleglede i hjertet og trykkes på bestilling i Norge - ingen masseproduksjon.</p>
          </li>
        </ul>
      </div>
      </div>
    </div>
  );
}