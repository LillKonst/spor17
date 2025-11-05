export default function ShippingAndReturns() {
  return (
    <div className="bg-white mx-2 md:mx-12 p-5 md:p-10 rounded-lg flex flex-col gap-5 text-gray-800">
      <h2 className="text-2xl font-semibold mb-5">Frakt og retur</h2>

      <section>
        <h3 className="text-xl font-semibold mt-4 mb-2">Frakt</h3>
        <p>
          Bestillingene produseres og sendes gjennom vår produksjonspartner Gelato. Normal behandlingstid er 1–3 virkedager,
          men i travle perioder (som jul) kan det ta litt lengre tid før ordren sendes.
        </p>
        <p>
          Vi leverer til hele Norge. Når bestillingen din er sendt, mottar du en e-post med sporingsinformasjon. 
          Vi har fastpris på frakt på 49 kr.
        </p>
        <p>
          Vanlig leveringstid er 3–7 virkedager fra bestillingen er behandlet. Gelato benytter vanligvis Helthjem, 
          men i enkelte tilfeller kan andre transportører brukes, som PostNord eller Bring.
          Dersom en ordre deles opp i flere forsendelser, belastes du bare én gang for frakt.
        </p>
        <p>
          Vi gjør vårt beste for at varene skal leveres innen oppgitt tid, men uforutsette forsinkelser kan forekomme. 
          Hvis leveringen blir betydelig forsinket, vil du bli informert og få mulighet til å heve kjøpet eller få refundert beløpet.
        </p>
      </section>

      <section>
        <h3 className="text-xl font-semibold mt-4 mb-2">Retur og angrerett</h3>
        <p>
          Du har 14 dagers angrerett fra dagen du mottar varen, i tråd med angrerettloven. 
          Varen må være i samme stand som ved mottak, og i original emballasje. 
          Du betaler selv returporto ved bruk av angreretten.
        </p>
        <ul className="list-disc ml-5 mb-3">
          <li>Personlig tilpassede produkter</li>
          <li>Varer som har blitt tatt i bruk</li>
        </ul>
        <p>
          Ta kontakt med oss før du returnerer en vare, slik at vi kan sende deg informasjon om returprosessen.
        </p>
      </section>
    </div>
  );
}
