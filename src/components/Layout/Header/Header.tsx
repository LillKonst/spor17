import logo from "../../../images/logo.svg"

import { Link } from "react-router-dom";

export function RouteNotFound() {
  return <div>Page not found</div>;
}

export default function Header() {
  return (
    <div className="p-5 flex items-center justify-between">
      <Link to="">
      <img src={logo} alt="Spor 17 logo" className="w-28"/>
      </Link>
      <nav>
        <ul className="flex gap-4 text-xl">
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
             <Link to="/Contact">
            Kontakt
            </Link> 
          </li>
        </ul>
      </nav>
    </div>
  );
}