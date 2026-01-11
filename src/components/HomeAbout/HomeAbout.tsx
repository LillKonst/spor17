import aboutImg from "../../images/til-home2.jpg"; // bilde av deg eller kreativt arbeidsområde
import { Link } from "react-router-dom";

export default function HomeAbout() {
  return (
    <section className="border-2 border-customPink mx-5 md:mx-12 p-5 md:p-10 rounded-lg flex flex-col lg:flex-row gap-5 items-center">
      <div className="lg:flex-1">
        <img 
          src={aboutImg} 
          alt="Lill i kreativt miljø" 
          className="rounded w-full max-h-[400px] object-cover shadow-lg"
        />
      </div>

      <div className="lg:flex-1 flex flex-col justify-center">
        <h2 className="text-2xl md:text-3xl mb-4">Hei – så fint at du er her 💗</h2>
        <p className="mb-4 text-lg md:text-xl">
          Spor 17 er et lite, personlig prosjekt. Bak står jeg, Lill, som elsker design, enkelhet og kreative uttrykk. 
          Jeg lager kort og produkter som er ment å brukes – ikke bare beundres.
        </p>
        <p className="mb-4 text-lg md:text-xl">
          Når du handler hos Spor 17, støtter du mitt lille, kreative prosjekt – og gjør det mulig for meg å fortsette å lage ting som betyr noe.
        </p>
        <Link 
          to="/om" 
          className="self-start bg-ctaPink hover:bg-customPink text-white px-6 py-3 rounded-lg mt-3 text-lg transition"
        >
          Les mer om Spor 17
        </Link>
      </div>
    </section>
  );
}
