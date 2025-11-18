import { Link } from "react-router-dom";
// import produkt1 from "../../images/Julekort-by.png";
// import produkt2 from "../../images/Julekort-juletre.png";
// import produkt3 from "../../images/Julekort-jente.png";
// import produkt4 from "../../images/Julekort-pakker.png";
// import produkt5 from "../../images/Julekort-venterpånissen.png";
// import produkt6 from "../../images/Julekort-hus.png";
// import produkt7 from "../../images/Julekort-snømann.png";
// import produkt8 from "../../images/Julekort-misteltein.png";

// export default function MainImg() {
//   return(
//     <div className="bg-white w-full rounded m-0 p-2 xxs:p-5 xs:p-8 md:px-12">
//       <Link to="/produkter" className="lg:px-12 grid grid-cols-6 auto-rows-auto md:grid-rows-2 gap-1">
//         <img src={produkt1} alt="" className="col-span-1 row-span-1"/>
//         <img src={produkt2} alt="" className="col-span-1 row-span-1"/>
//         <img src={produkt3} alt="" className="col-span-1 row-span-1"/>
//         <img src={produkt4} alt="" className="col-span-1 row-span-1"/>
//         <img src={produkt5} alt="" className="col-span-1 row-span-1"/>
//         <img src={produkt6} alt="" className="col-span-1 row-span-1"/>
//         <div className="col-span-4 p-1 xxs:p-3 sm:p-5 flex flex-col justify-center">
//           <h1 className="text-xl sm:text-6xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl">DEN ENKLE SERIEN</h1>
//           <h2 className="xxxs:text-md xs:text-2xl sm:text-3xl md:text-2xl lg:text-4xl 2xl:text-5xl">ENKLE OG SØTE JULEKORT 2025</h2>
//         </div>
//         <img src={produkt7} alt="" className="col-span-1 row-span-1"/>
//         <img src={produkt8} alt="" className="col-span-1 row-span-1"/>
        
//       </Link>
//     </div>
//   );
// }

import mainImage from "../../images/main-imagee.jpg";
// import snowmanimg from "../../images/20251118_135330.jpg";

export default function MainImg() {
  return (
    <div className="relative w-full lg:px-20  lg:rounded">
      <img src={mainImage} alt="Bilde av alle julekortene samlet." className="w-full lg:rounded-t"/>
      <div className=" w-full px-5 py-3 rounded-b flex gap-2 items-center justify-between">
        <h1 className="text-xs xxxs:text-md xs:text-2xl font-bold">Gi en personlig hilsen til jul</h1> 
        <Link to="/produkter" className="flex gap-2 bg-customHover px-3 py-2 rounded text-sm"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="20" fill="currentColor" className="bi bi-arrow-right hidden xxxs:flex" viewBox="0 0 16 16">
          <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"/>
        </svg> Velg ditt motiv</Link>
      </div>
      <ul className="flex flex-wrap gap-2 mx-2 my-2">
          <li className="text-xs px-3 py-2 rounded-2xl border-2 border-gray-200 ">10 kort per pakke - 1 motiv</li>
          <li className="text-xs px-3 py-2 rounded-2xl border-2 border-gray-200">norsk design</li>
          <li className="text-xs px-3 py-2 rounded-2xl border-2 border-gray-200">rask levering</li>
          <li className="text-xs px-3 py-2 rounded-2xl border-2 border-gray-200">Pris: 249 kr + frakt 39 kr</li>
        </ul>

        {/* <img src={snowmanimg} alt="Snømann kort ligger utover bordet" /> */}
    </div>
  );
}