import WriteCardDisplay from "../../images/IMG_1075-200kb.jpg";

export default function Reviews() {
  return (
    <div className="bg-white md:p-20 my-10 rounded-lg flex flex-col gap-5 md:flex-row w-full md:px-20 self-center justify-center items-center">
      <div className="w-full relative md:max-w-[450px]">
        <img src={WriteCardDisplay} alt="2 pakker med kort" className="w-full md:rounded"/>
        <div className="absolute top-[15%] left-[4%] right-[43%]">
          <h3 className="font-bold text-[1vh] xxxs:text-[2vh] xs:text-[3vh] sm:text-2xl">
          Skriv noen varme ord til de du er glad i  
        </h3>
        </div>
        
      </div>

     
      <div className="hidden flex-1 flex-col justify-center text-center lg:text-left xl:mx-10 md:pe-12">
      <h2>Kundeomtaler</h2>
      <div>
        <p>Kundeomtaler kommer her</p>
      </div>
      </div>
    </div>
  );
}