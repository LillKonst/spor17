import produkt1 from "../../images/motiv-by.png";
import { Link } from "react-router-dom";

export default function AllProducts() {
  return(
    <div className="">
      <h1 className="text-2xl p-5 ">JULEKORT - DEN ENKLE SERIEN</h1>
    <div className="grid grid-cols-4 gap-5">
      <Link to="/ProductSpecific/:id">
      <div className="transition-transform ease-out duration-200 hover:scale-102 rounded-lg p-8 bg-white flex flex-col shadow-lg">
        <img src={produkt1} alt="liten by" />
        <div className=" mt-2 px-1 flex flex-col justify-center">
          <p className="text-lg">Liten by motiv - 10 stk</p>
          <p className="text-lg font-semibold">220,-</p>
        </div>
      </div>
      </Link>   

      <div className="transition-transform ease-out duration-200 hover:scale-102 rounded-lg p-8 bg-white flex flex-col shadow-lg">
        <img src={produkt1} alt="liten by" />
        <div className=" mt-2 px-1 flex flex-col justify-center">
          <p className="text-lg">Liten by motiv - 10 stk</p>
          <p className="text-lg font-semibold">220,-</p>
        </div>
      </div> 
      <div className="transition-transform ease-out duration-200 hover:scale-102 rounded-lg p-8 bg-white flex flex-col shadow-lg">
        <img src={produkt1} alt="liten by" />
        <div className=" mt-2 px-1 flex flex-col justify-center">
          <p className="text-lg">Liten by motiv - 10 stk</p>
          <p className="text-lg font-semibold">220,-</p>
        </div>
      </div> 
      <div className="transition-transform ease-out duration-200 hover:scale-102 rounded-lg p-8 bg-white flex flex-col shadow-lg">
        <img src={produkt1} alt="liten by" />
        <div className=" mt-2 px-1 flex flex-col justify-center">
          <p className="text-lg">Liten by motiv - 10 stk</p>
          <p className="text-lg font-semibold">220,-</p>
        </div>
      </div> 
      <div className="transition-transform ease-out duration-200 hover:scale-102 rounded-lg p-8 bg-white flex flex-col shadow-lg">
        <img src={produkt1} alt="liten by" />
        <div className=" mt-2 px-1 flex flex-col justify-center">
          <p className="text-lg">Liten by motiv - 10 stk</p>
          <p className="text-lg font-semibold">220,-</p>
        </div>
      </div> 
      <div className="transition-transform ease-out duration-200 hover:scale-102 rounded-lg p-8 bg-white flex flex-col shadow-lg">
        <img src={produkt1} alt="liten by" />
        <div className=" mt-2 px-1 flex flex-col justify-center">
          <p className="text-lg">Liten by motiv - 10 stk</p>
          <p className="text-lg font-semibold">220,-</p>
        </div>
      </div> 
      <div className="transition-transform ease-out duration-200 hover:scale-102 rounded-lg p-8 bg-white flex flex-col shadow-lg">
        <img src={produkt1} alt="liten by" />
        <div className=" mt-2 px-1 flex flex-col justify-center">
          <p className="text-lg">Liten by motiv - 10 stk</p>
          <p className="text-lg font-semibold">220,-</p>
        </div>
      </div> 
      <div className="transition-transform ease-out duration-200 hover:scale-102 rounded-lg p-8 bg-white flex flex-col shadow-lg">
        <img src={produkt1} alt="liten by" />
        <div className=" mt-2 px-1 flex flex-col justify-center">
          <p className="text-lg">Liten by motiv - 10 stk</p>
          <p className="text-lg font-semibold">220,-</p>
        </div>
      </div> 
      
     
    </div>
    </div>
  );
}