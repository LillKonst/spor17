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

import mainImage from "../../images/DSC_0043-main.jpg";
import snowmanimg from "../../images/20251118_135330-cut.jpg";

export default function MainImg() {
  return (
    <div className="w-full lg:px-12 flex flex-col lg:flex-row gap-5">
      <div className="relative lg:rounded">
        <img src={mainImage} alt="En hånd gir et julekort med snømann til en annen hånd." className="w-full lg:rounded-t"/>
        <h1 className="absolute bottom-0 left-0 bg-black/50 p-5 text-white text-xs xxxs:text-md xs:text-2xl font-bold">Gi en personlig hilsen til jul</h1> 
      </div>
      
      <div className="w-full flex lg:flex-col gap-2 sm:gap-5 px-3">
        <div className="w-full flex-1 h-full rounded">
          <img src={snowmanimg} alt="Snømann kort ligger utover bordet" className="w-full h-auto object-cover" />
        </div>
        <div className="flex flex-col gap-1 flex-1 justify-between">
           <Link to="/produkter" className="flex flex-1 gap-1 bg-customHover rounded text-xs xxxs:text-sm xxs:text-lg sm:text-xl items-center justify-center"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="20" fill="currentColor" className="bi bi-arrow-right hidden xxxs:flex" viewBox="0 0 16 16">
          <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"/>
        </svg> Velg ditt motiv</Link>
        <Link to="/produkter" className="flex flex-1 gap-1 bg-customHover rounded text-xs xxxs:text-sm xxs:text-lg sm:text-xl items-center justify-center"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="20" fill="currentColor" className="bi bi-arrow-right hidden xxxs:flex" viewBox="0 0 16 16">
          <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"/>
        </svg> Populære kort</Link>
        <Link to="/produkter" className="flex flex-1 gap-1 bg-customHover rounded text-xs xxxs:text-sm xxs:text-lg sm:text-xl items-center justify-center"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="20" fill="currentColor" className="bi bi-arrow-right hidden xxxs:flex" viewBox="0 0 16 16">
          <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"/>
        </svg> Vår favoritt</Link>
        </div>
      </div>        
    </div>
  );
}