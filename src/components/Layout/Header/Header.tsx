import { useEffect, useState, useRef } from "react";
import logo from "../../../images/SPOR17-TOG-LOGO.svg"
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Searchbar from "./Searchbar";



export function RouteNotFound() {
  return <div>Page not found</div>;
}

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const [cartCount, setCartCount] = useState<number>(0);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  useEffect(() => {
  const storedCount = localStorage.getItem("cartCount");
  if (storedCount) setCartCount(Number(storedCount));

  const handleCartCountUpdated = () => {
    const updatedCount = localStorage.getItem("cartCount");
    if (updatedCount) setCartCount(Number(updatedCount));
  };

  window.addEventListener("cartCountUpdated", handleCartCountUpdated);

  return () => {
    window.removeEventListener("cartCountUpdated", handleCartCountUpdated);
  };
}, []);


  return (
    <div className="pt-15 xxxs:pt-12 xxs:pt-10 mb-3 px-2 flex flex-col xxxs:flex-row items-center justify-between relative xxs:mb-3">
      <Link to="" className="flex items-center gap-2 text-2xl w-[145px]">
      <img src={logo} alt="Spor 17 logo" className=""/>
      </Link>

      <div className="flex gap-5 items-center lg:w-full">
        <Link to="cart" onClick={() => setIsMenuOpen(false)} className="relative lg:order-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-bag relative" viewBox="0 0 16 16">
            <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1m3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1z"/>
          </svg>
          <AnimatePresence mode="popLayout">
          {cartCount > 0 && (
            <motion.span
              key={cartCount} 
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
              className="absolute top-1 left-2 lg:top-1 lg:right-2 text-red-600 text-sm font-bold rounded flex items-center justify-center"
            >
              {cartCount}
            </motion.span>
            )}
          </AnimatePresence>
         </Link>

      <div className="block lg:hidden">
          <button
            ref={buttonRef}
            onClick={toggleMenu}
            className="text-md p-2 text-black font-semibold rounded-lg bg-white shadow-lg relative z-50"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-list" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"/>
            </svg>
          </button>
        </div>

         <div
          ref={menuRef}
          className={`${
            isMenuOpen ? "flex" : "hidden lg:flex"
          } absolute lg:static top-[77px] left-50 right-0 h-screen lg:h-[70px] p-5 lg:p-0 
                       rounded
                     bg-background lg:bg-transparent lg:w-full flex flex-col lg:flex-row gap-5 lg:items-center lg:justify-between
                      lg:space-x-4 z-40`}
        >

      <nav className="lg:self-center lg:mt-5 lg: ms-8">
        <ul className="flex flex-col lg:flex-row gap-4 text-xl">
          <li>
            <Link to="/AllProducts" onClick={() => setIsMenuOpen(false)} className="hover:underline">
            Produkter
            </Link> 
          </li>
          <li>
             <Link to="/About" onClick={() => setIsMenuOpen(false)} className="hover:underline">
            Om Oss
            </Link>
          </li>
          
        </ul>
      </nav>
       <Searchbar />
      </div>
        </div>
    </div>
  );
}