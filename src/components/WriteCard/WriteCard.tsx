import { Link } from "react-router-dom";
import MarkusCard from "../../images/markus-skriver-kort.JPG";

export default function WriteCard () {
  return (
    <div className="my-16 px-5">
  <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 items-center">

    {/* Bilde */}
    <div className="rounded-xl overflow-hidden">
      <img
        src={MarkusCard}
        alt="Barn som skriver på bursdagskort"
        className="w-full h-full object-cover"
      />
    </div>

    {/* Tekst */}
    <div className="flex flex-col gap-4">
      <h2 className="text-3xl">
        Ord som varer litt lenger
      </h2>
      <p className="text-lg text-gray-700">
        Et bursdagskort er mer enn papir.  
        Det er noen som har tenkt på deg, skrevet til deg og valgt med omtanke.
      </p>

      <Link
        to="/kolleksjon/barnebursdag"
        className="w-fit mt-4 bg-ctaPink text-white px-6 py-3 rounded"
      >
        Se bursdagskortene
      </Link>
    </div>
  </div>
  </div>
  );
}