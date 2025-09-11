import logo from "../../../images/logo.svg"

export function RouteNotFound() {
  return <div>Page not found</div>;
}

export default function Header() {
  return (
    <div className="p-5 flex items-center justify-between">
      <img src={logo} alt="Spor 17 logo"/>
      <nav>
        <ul className="flex gap-4">
          <li>Julekort</li>
          <li>Om oss</li>
          <li>Kontakt</li>
        </ul>
      </nav>
    </div>
  );
}