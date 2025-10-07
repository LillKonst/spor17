import { useEffect, useState, useRef } from "react";
import logo from "../../../images/Logo-SPOR17.svg"
import { Link } from "react-router-dom";


export function RouteNotFound() {
  return <div>Page not found</div>;
}

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

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

  return (
    <div className="p-5 flex items-center justify-between relative">
      <Link to="" className="flex items-center gap-2 text-2xl w-[145px]">
      <img src={logo} alt="Spor 17 logo" className="w-8"/> spor 17
      </Link>

      <div className="block md:hidden">
          <button
            ref={buttonRef}
            onClick={toggleMenu}
            className="text-md p-2 mt-3 text-black font-semibold rounded-lg bg-white shadow-lg relative z-50"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-list" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"/>
            </svg>
          </button>
        </div>

         <div
          ref={menuRef}
          className={`${
            isMenuOpen ? "flex" : "hidden md:flex"
          } absolute md:static top-[77px] left-50 right-0 h-screen md:h-[70px] p-5 md:p-0 
                       rounded
                     bg-background md:w-full md:justify-end
                      md:space-x-4 z-40`}
        >

      <nav className="md:self-center">
        <ul className="flex flex-col md:flex-row gap-4 text-xl">
          <li>
            <Link to="/AllProducts">
            Julekort
            </Link> 
          </li>
          <li>
             <Link to="/About">
            Om Oss
            </Link>
          </li>
          <li>
            <Link to="cart">
            Handlekurv
            </Link>
          </li>
        </ul>
      </nav>
      </div>
    </div>
  );
}