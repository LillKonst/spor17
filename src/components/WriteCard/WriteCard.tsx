import MarkusCard from "../../images/markus-skriver-kort.JPG";
import { COLLECTION_HANDLES } from "../../constants/collections";
import CTAButton from "../Buttons/CTAButton";
import { useNavigate } from "react-router-dom";


export default function WriteCard () {
  const navigate = useNavigate();
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

      <CTAButton
                label="Se bursdagskortene"
                onClick={() =>
                  navigate(`/kolleksjon/${COLLECTION_HANDLES.BARNEBURSDAG}`)
                }
                className="w-fit"
              />
    </div>
  </div>
  </div>
  );
}