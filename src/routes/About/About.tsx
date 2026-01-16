import aboutImg from "../../images/about-img.jpg";

export default function About() {
  return (
    <div className="bg-white mx-2 md:mx-12 px-5 md:px-10 rounded-lg flex flex-col lg:flex-row gap-6">
      <div className="my-5 lg:flex-3">
        <h2 className="text-xl lg:text-2xl mb-5">
          Hei – så fint at du er her 💗
        </h2>

        <p className="lg:text-lg mb-5">
          Spor 17 er et lite, kreativt prosjekt – og et ganske personlig ett.
          Bak Spor 17 står jeg, Lill.
        </p>

        <p className="lg:text-lg mb-5">
          Jeg har i mange år jobbet profesjonelt i dansebransjen, og kreativitet
          har alltid vært en naturlig del av hverdagen min. Etter hvert tok jeg
          også steget inn i frontend-utvikling, og sommeren 2025 begynte en ny idé
          å ta form: å samle det jeg liker best – design, form, ro og uttrykk – i
          ett prosjekt.
        </p>

        <p className="lg:text-lg mb-10">
          Spor 17 ble starten på det.
        </p>

        <h3 className="text-lg lg:text-xl font-semibold mb-3">
          Enkle kort, laget med omtanke
        </h3>

        <p className="lg:text-lg mb-5">
          Jeg designer kort med et ønske om å holde det enkelt og ærlig. Motiver
          som får puste, ord som kan bety noe, og produkter som er ment å brukes –
          ikke bare kjøpes.
        </p>

        <p className="lg:text-lg mb-10">
          Reisen startet med åtte julekort. Nå kommer det gradvis flere typer
          kort, og etter hvert også plakater i sortimentet. Alt designes av meg og produseres på bestilling, slik at jeg kan jobbe fleksibelt og bærekraftig i liten skala.
        </p>

        <h3 className="text-lg lg:text-xl font-semibold mb-3">
          Et lite brand – med rom for mer
        </h3>

        <p className="lg:text-lg mb-10">
          Spor 17 er ikke et stort firma, og det er heller ikke meningen. Det er
          en plattform der kreativiteten min får ta plass – og der det etter
          hvert også kan bli rom for flere uttrykk og kanskje flere kunstnere.
        </p>

        <h3 className="text-lg lg:text-xl font-semibold mb-3">
          Takk for at du støtter noe lite
        </h3>

        <p className="lg:text-lg mb-5">
          Når du handler hos Spor 17, støtter du meg og mitt lille prosjekt. Det
          betyr mer enn du kanskje tror.
        </p>

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
