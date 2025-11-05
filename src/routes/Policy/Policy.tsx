export default function Policy() {
  return (
    <div className="bg-white mx-2 md:mx-12 p-5 md:p-10 rounded-lg flex flex-col lg:flex-row gap-2">
      <div className="my-5 md:my-10 lg:flex-3 text-gray-800">
        <h2 className="text-2xl my-5 font-semibold">Kjøpsbetingelser for spor17.no</h2>

        <p>
          Spor17.no drives av Lill-Kristine Konst (enkeltpersonforetak), org.nr. 916 851 383, 
          med adresse Nygata 11, 3189 Horten. Har du spørsmål, kan du kontakte oss på{" "}
          <a href="mailto:post@spor17.no" className="text-blue-600 underline">post@spor17.no</a>{" "}
          eller via kontaktskjemaet på{" "}
          <a href="https://spor17.no/kontakt" className="text-blue-600 underline">spor17.no/kontakt</a>.
        </p>

        <h3 className="text-xl mt-6 mb-2 font-semibold">2. Bestilling</h3>
        <p>
          Når du legger inn en bestilling i nettbutikken, mottar du automatisk en ordrebekreftelse på e-post.
          Vi anbefaler at du ser gjennom ordrebekreftelsen for å forsikre deg om at alt stemmer med bestillingen din – antall, pris og produkter.
          Dersom noe er feil, ta kontakt med oss så raskt som mulig.
        </p>
        <p>
          Ved å gjennomføre et kjøp godtar du også vilkårene til våre betalingsleverandører.
          Våre produkter er ment for privat bruk, og vi forbeholder oss retten til å kansellere ordre som vurderes som videresalg.
        </p>

        <h3 className="text-xl mt-6 mb-2 font-semibold">3. Pris</h3>
        <p>
          Alle priser er oppgitt i norske kroner (NOK). Vi er en ny og liten bedrift og foreløpig ikke MVA-registrert. 
          Prisene du ser er derfor endelige, uten tillegg av merverdiavgift.
        </p>
        <p>
          Ved spesialkampanjer eller rabatter kan det oppstå mindre forsinkelser i oppdateringen av prisene. 
          Dersom et tilbud har utløpt, er det ikke mulig å fullføre kjøp til tidligere kampanjepris.
        </p>
        <p>
          Rabatter trekkes automatisk fra i kassen når de gjelder. 
          Har du mottatt en rabattkode, legges den inn før betaling. Rabattkoder kan ikke etterregistreres etter at kjøpet er fullført.
        </p>

        <h3 className="text-xl mt-6 mb-2 font-semibold">4. Betaling</h3>
        <p>
          Du kan betale med de betalingsmetodene som vises i kassen.
          Betaling skjer sikkert gjennom Shopify Payments, som kan inkludere kortbetaling (Visa/Mastercard) eller PayPal, 
          avhengig av hva som er aktivert i nettbutikken.
        </p>
        <p>
          Fraktkostnader beregnes ved utsjekk og legges til totalsummen før du betaler.
          Du vil motta kvittering og bekreftelse på e-post når kjøpet er gjennomført.
        </p>

        <h3 className="text-xl mt-6 mb-2 font-semibold">5. Behandling og levering</h3>
        <p>
          Bestillingene produseres og sendes gjennom vår produksjonspartner Gelato. 
          Normal behandlingstid er 1–3 virkedager, men i travle perioder (som jul) kan det ta litt lengre tid før ordren sendes.
        </p>
        <p>
          Vi leverer til hele Norge. Når bestillingen din er sendt, mottar du en e-post med sporingsinformasjon. 
          Vi har fastpris på frakt på 49 kr.
        </p>
        <p>
          Vanlig leveringstid er 3–7 virkedager fra bestillingen er behandlet. 
          Gelato benytter vanligvis Helthjem, men i enkelte tilfeller kan andre transportører brukes, som PostNord eller Bring.
          Dersom en ordre deles opp i flere forsendelser, belastes du bare én gang for frakt.
        </p>
        <p>
          Vi gjør vårt beste for at varene skal leveres innen oppgitt tid, men uforutsette forsinkelser kan forekomme. 
          Hvis leveringen blir betydelig forsinket, vil du bli informert og få mulighet til å heve kjøpet eller få refundert beløpet.
        </p>

        <h3 className="text-xl mt-6 mb-2 font-semibold">6. Angrerett og retur</h3>
        <p>
          Du har 14 dagers angrerett fra dagen du mottar varen, i tråd med angrerettloven. 
          Varen må være i samme stand som ved mottak, og i original emballasje. 
          Du betaler selv returporto ved bruk av angreretten.
        </p>
        <ul className="list-disc ml-5 mb-3">
          <li>Personlig tilpassede produkter</li>
          <li>Varer som har blitt tatt i bruk</li>
        </ul>
        <p>Ta kontakt med oss før du returnerer en vare, slik at vi kan sende deg informasjon om returprosessen.</p>

        <h3 className="text-xl mt-6 mb-2 font-semibold">7. Reklamasjon</h3>
        <p>
          Dersom varen har en produksjonsfeil eller skade som ikke skyldes vanlig bruk, gjelder reklamasjonsretten i henhold til forbrukerkjøpsloven.
          Reklamasjonsretten gjelder i to år fra mottak (eller fem år dersom produktet er ment å vare vesentlig lenger).
        </p>
        <p>
          Ved reklamasjon dekker Spor 17 returkostnadene, og du får en returetikett fra oss.
          Reklamasjonsretten gjelder ikke ved feil bruk, uhell eller normal slitasje.
        </p>

        <h3 className="text-xl mt-6 mb-2 font-semibold">8. Utsolgte varer og feil</h3>
        <p>
          Dersom et produkt er utsolgt eller det har oppstått feil i lagerbeholdningen, kan bestillingen kanselleres.
          Ved åpenbare feil i pris eller informasjon i nettbutikken forbeholder vi oss retten til å kansellere bestillingen, 
          selv om du har mottatt ordrebekreftelse.
        </p>

        <h3 className="text-xl mt-6 mb-2 font-semibold">9. Avbestilling og uavhentede pakker</h3>
        <p>
          Ønsker du å avbestille en ordre, må du kontakte oss så raskt som mulig. 
          Når ordren er sendt til produksjon, kan den ikke lenger avbestilles.
        </p>
        <p>
          Dersom en pakke ikke hentes ut, vil du bli belastet for returkostnadene. 
          Frakt refunderes kun ved angrerett eller reklamasjon.
        </p>

        <h3 className="text-xl mt-6 mb-2 font-semibold">10. Personvern</h3>
        <p>
          Vi tar personvern på alvor. Opplysningene du oppgir ved bestilling brukes kun for å behandle ordren din og levere varene.
          Vi deler kun nødvendige data med våre betalings- og fraktpartnere (for eksempel Gelato og Shopify Payments).
          Les vår personvernerklæring for mer informasjon.
        </p>

        <h3 className="text-xl mt-6 mb-2 font-semibold">11. Kontaktinformasjon</h3>
        <p>
          E-post: <a href="mailto:post@spor17.no" className="text-blue-600 underline">post@spor17.no</a><br />
          Kontaktskjema:{" "}
          <a href="https://spor17.no/kontakt" className="text-blue-600 underline">spor17.no/kontakt</a>
        </p>
        <p className="text-sm text-gray-500 mt-4">
          Spor 17 forbeholder seg retten til å oppdatere kjøpsbetingelsene ved behov. Sist oppdatert: 05.11.2025.
        </p>
      </div>
    </div>
  );
}
