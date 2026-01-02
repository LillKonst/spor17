
export default function Reviews() {
  return (
       <div className="pb-10 flex-1 flex-col justify-center text-center xs:mx-5 xl:mx-10 border-1 border-customPink rounded m-5">
      <h2 className="text-2xl m-5">Kundeomtaler</h2>
      <div>
        <ul className="flex flex-col gap-10 max-w-[350px] mx-auto">
          <li className="mx-5">
            <p className="text-xl font-Raleway">Elisabeth</p>
            <p>{`“Anbefalar @spor17.no på det varmaste! Enkel handel og rask frakt :)”`}</p>
          </li>
          <li className="mx-5 font-Raleway">
            <p className="text-xl font-Raleway">Aud</p>
            <p>{`“Så vakre kort! Enkle og søte motiv. Fikk kortene rett i postkassa :)”`}</p>
          </li>
          <li className="mx-5">
            <p className="text-xl font-Raleway">Joakim</p>
            <p>{`“Tok 3 dager fra jeg bestilte til de kom i postkassa. De var kjempe fine <3”`}</p>
          </li>
        </ul>
      </div>
      </div>
  );
}