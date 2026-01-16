import aboutImg from "../../images/about-img.jpg";
import { Link } from "react-router-dom";

export default function HomeAbout() {
  return (
    <section className="mx-2 xl:mx-12 p-5 lg:p-10 rounded-lg flex flex-col sm:flex-row gap-5 items-center sm:items-stretch  lg:max-w-[1000px]">
      <div className="">
        <img 
          src={aboutImg} 
          alt="Lill i kreativt miljø" 
          className="rounded w-full max-h[600px] sm:max-h-[400px] lg:max-h-[500px] lg:w-fit object-cover shadow-lg"
        />
      </div>

    <div className="flex flex-col gap-5 md:flex-1 md:h-[400px] lg:h-[500px]">
      <Link 
          to="/om"  className=" flex flex-col justify-center bg-customPink hover:scale-103 rounded p-5 h-full lg:py-10">
        <h2 className="text-xl xs:text-2xl lg:text-4xl mb-5">Hei – så fint at du er her 💗</h2>
        <p className="lg:mb-4 text-lg md:text-2xl">
          Jeg heter Lill og lager illustrerte kort til små og store øyeblikk.
          
        </p>
        <p className="text-lg md:text-2xl lg:mt-10 flex gap-2 items-center">Vil du vite mer om Spor 17? 
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-right" viewBox="0 0 16 16">
  <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"/>
</svg>
        </p>
        
      </Link>
      
      <Link 
          to="/kontakt" 
          className="border-2 border-ctaPink hover:scale-103 text-customBlack px-6 py-3 rounded lg:py-12 text-lg md:text-2xl transition text-center"
        >
          Eller stille et spørsmål?
        </Link>
        </div>
    </section>
  );
}
