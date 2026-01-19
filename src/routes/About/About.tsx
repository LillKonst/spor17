import aboutImg from "../../images/about-img.jpg";

export default function About() {
  return (
    <div className="bg-white mx-2 md:mx-12 px-5 md:px-10 rounded-lg flex flex-col lg:flex-row gap-6">
      <div className="my-5 lg:flex-3">
        <h2 className="text-xl lg:text-2xl mb-5">
          Hei – så fint at du er her 💗
        </h2>

        <p className="lg:text-lg mb-5">
          Spor 17 er et lite, kreativt prosjekt med fokus på form og uttrykk.
          Bak Spor 17 står jeg, Lill.
        </p>

        <p className="lg:text-lg mb-5">
          Kreativitet har alltid vært en naturlig del av livet mitt. Jeg har jobbet profesjonelt med dans i mange år, og senere også med frontend-utvikling. Etter hvert vokste ønsket om å samle det jeg liker best – design, uttrykk, struktur og stillhet – i ett prosjekt.
        </p>

        <p className="lg:text-lg mb-10">
          Spor 17 ble starten på det.
        </p>

        <h3 className="text-lg lg:text-xl font-semibold mb-3">
          Enkle kort, laget med omtanke
        </h3>

        <p className="lg:text-lg mb-10">
          Jeg designer kort med et ønske om å holde det enkelt og ærlig.
          Motiver som får puste, ord med mening, og produkter som er ment å brukes – ikke bare kjøpes.
          Alt designes av meg og produseres på bestilling, slik at jeg kan jobbe fleksibelt og bærekraftig i liten skala.
        </p>


        <h3 className="text-lg lg:text-xl font-semibold mb-3">
          Et lite brand i utvikling
        </h3>

        <p className="lg:text-lg mb-5">
          Reisen startet med åtte julekort. Nå kommer det gradvis flere typer kort, og etter hvert også plakater og nye uttrykk. Sortimentsutviklingen får skje sakte, med rom for å kjenne etter underveis.
        </p>

        <p className="lg:text-lg mb-10">
          Spor 17 er ikke ment å være stort, men det er ment å være gjennomtenkt. På sikt kan det også bli et rom for flere kreative stemmer – akkurat nå er det mitt.
        </p>

        <h3 className="text-lg lg:text-xl font-semibold mb-3">
          Takk for at du støtter mitt lille prosjekt
        </h3>

        <p className="lg:text-lg mb-8">
          Jeg håper kortene mine får være med på å markere små og store øyeblikk –
          og kanskje gjøre dem litt finere.
        </p>

        <p className="lg:text-xl font-medium">
          Med varme,<br />
          Lill / Spor 17
        </p>
      </div>

      <div className="w-full lg:flex-2 max-h-[550px] md:w-[500px] md:m-10">
        <img
          src={aboutImg}
          alt="Lill – Spor 17"
          className="rounded w-full h-full object-cover"
        />
      </div>
    </div>
  );
}
