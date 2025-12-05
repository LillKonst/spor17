import WriteCardDisplay from "../../images/IMG_1075-200kb.jpg";

export default function Reviews() {
  return (
    <div className="bg-white sm:p-5 my-10 rounded-lg flex flex-col gap-5 lg:flex-row w-full lg:px-20 self-center justify-center items-center lg:max-w-[1200px] mx-auto">
      <div className="w-full relative md:max-w-[450px]">
        <img src={WriteCardDisplay} alt="2 pakker med kort" className="w-full md:rounded"/>
        <div className="absolute top-[15%] left-[4%] right-[43%]">
          <h3 className="font-bold text-[1vh] xxxs:text-[2vh] xs:text-[3vh] sm:text-2xl">
          Skriv noen varme ord til de du er glad i  
        </h3>
        </div>
        
      </div>

     
      <div className="pb-10 flex-1 flex-col justify-center text-center xs:mx-5 xl:mx-10 ">
      <h2 className="text-2xl m-5">Kundeomtaler</h2>
      <div>
        <ul className="flex flex-col gap-10 max-w-[350px] mx-auto">
          <li className="mx-5">
            <p className="text-xl font-Raleway">Elisabeth</p>
            <p>{`“Anbefalar @spor17.no på det varmaste! Enkel handel og rask frakt :)”`}</p>
          </li>
          <li className="mx-5 font-Raleway">
            <p className="text-xl font-Raleway">Aud</p>
            <p>{`“Så vakre kort! Enkle og søte motiv. Fikk kortene rett i postkassa :)”`}</p>
          </li>
          <li className="mx-5">
            <p className="text-xl font-Raleway">Joakim</p>
            <p>{`“Tok 3 dager fra jeg bestilte til de kom i postkassa. De var kjempe fine <3”`}</p>
          </li>
        </ul>
      </div>
      </div>
    </div>
  );
}