import aboutImg from "../../images/til-home2.jpg";

export default function About() {
  return(
    <div className="bg-white mx-2 md:mx-12 p-5 md:p-10 rounded-lg flex flex-col lg:flex-row gap-2">
      <div className="my-5 md:my-10 lg:flex-3">
        <h2 className="text-2xl my-5">Hei, og velkommen til spor17.no!</h2>
        <p className="text-lg mb-5">Spor 17 er en nyoppstartet plattform skapt med kjærlighet for norsk design, kvalitet og estetikk. Vi tror at det personlige uttrykket betyr noe – både når du gir og når du mottar.</p>
        <p className="text-lg mb-5">Akkurat nå tilbyr vi en serie julekort, designet digitalt i Norge og trykket lokalt. Kortene kommer i pakker på 10 med tilhørende konvolutter, og passer perfekt til deg som ønsker å spre litt ekstra varme og omtanke i juletiden.</p>
        <p className="text-lg mb-5">Dette er bare begynnelsen! Målet vårt er å utvide sortimentet etter hvert – med flere kort, plakater og andre designprodukter som bærer samme verdier: enkelhet, kvalitet og et tydelig norsk uttrykk.</p>
        <p className="text-lg mb-5">Takk for at du stikker innom – vi håper du finner noe du liker, og at kortene våre får være en liten del av dine fine øyeblikk.</p>
        <p className="text-2xl mb-5">XO Spor 17</p>
      </div>
      <div className="w-full lg:flex-2 max-h-[550px] md:w-[500px]">
        <img src={aboutImg} alt="bilde" className="rounded w-full h-full object-cover"/>
      </div>
      
    </div>
  );
}