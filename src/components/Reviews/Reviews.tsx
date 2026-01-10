import ReviewSlider from "./ReviewSlider";

const reviewData = [
  { id: "1", name: "Elisabeth", text: "“Anbefalar @spor17.no på det varmaste! Enkel handel og rask frakt :)”" },
  { id: "2", name: "Aud", text: "“Så vakre kort! Enkle og søte motiv. Fikk kortene rett i postkassa :)”" },
  { id: "3", name: "Joakim", text: "“Tok 3 dager fra jeg bestilte til de kom i postkassa. De var kjempe fine <3”" },
  { id: "4", name: "Hilde", text: "“Superfine julekort. Liker at de er enkle uten gull og glitter. Fin nettside og enkel bestilling. Kom raskt i postkassa :)”" },
  { id: "5", name: "Monica", text: "Kjempefine kort, som ble raskt levert. Superfornøyd 😊" },
  { id: "6", name: "Victoria", text: "nydelige kort som er enkel og super sjarmerende 🤩 profesjonelt laget og rask levering. anbefales på sterkeste!" },
];

export default function Reviews() {
  return (
    <div className="pb-10 flex-1 flex-col justify-center text-center w-full ps-5 xs:mx-5 xl:mx-10">
      <ReviewSlider reviews={reviewData} title="Kundeomtaler" />
    </div>
  );
}
