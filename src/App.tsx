import { Routes, Route } from "react-router-dom";
import { RouteNotFound } from "./components/Layout/Header/Header";
import Layout from "./components/Layout/Layout";
import Home from "./routes/Home/Home";
import About from "./routes/About/About";
import AllProducts from "./routes/AllProducts/AllProducts";
import ProductSpecific from "./routes/ProductSpecific/ProductSpecific";
import ShoppingCart from "./routes/ShoppingCart/ShoppingCart";
import Contact from "./routes/Contact/Contact";
import { HeadProvider, Title, Meta, Link } from 'react-head';
import ScrollToTop from "./components/Layout/ScrollToTop";
import Policy from "./routes/Policy/Policy";
import PrivacyPolicy from "./routes/Policy/PrivacyPolicy";
import ShippingAndReturns from "./routes/Policy/ShippingAndReturns";
import CookieBanner from "./components/CookieBanner/CookieBanner";
import MetaPixel from "./components/MetaPixel/MetaPixel";
import GoogleAnalytics from "./components/GoogleAnalytics/GoogleAnalytics";

function App() {
  

  return (
    <HeadProvider>
    <Title>Spor 17 - Unike julekort</Title>
    <Meta name="description" content="Oppdag unike julekort fra Spor 17. Enkle og stemningsfulle design som gjør julehilsenen personlig. Rask levering – perfekt til jul!" />
    <Meta property="og:title" content="Spor 17 - Unike julekort" />
    <Meta property="og:description" content="Enkle, stemningsfulle og håndtegnede julekort fra Spor 17. Gjør julehilsenen ekstra personlig." />
    <Meta property="og:image" content="/images/mainimgspor17.png" />
    <Link rel="icon" href="/fav-icon.svg" />
    <script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: `
{
  "@context": "https://schema.org",
  "@type": "Store",
  "name": "Spor 17",
  "url": "https://spor17.no",
  "description": "Unike, enkle og stemningsfulle julekort.",
  "logo": "https://spor17.no/fav-icon.svg",
  "sameAs": [
    "https://www.instagram.com/spor17.no",
    "https://www.facebook.com/profile.php?id=61583399043251"
  ]
}
`
  }}
/>

    <ScrollToTop />
    <CookieBanner />
      <MetaPixel pixelId="1523394162215243" />
      <GoogleAnalytics measurementId="G-CJ2ETBFSC2" />
    <div className="bg-background h-full relative">
       <div className="bg-customGreen p-1 absolute top-0 left-0 right-0 md:h-7 w-full text-center z-0 mb-10">
          <p className="text-xs md:text-sm lg:text-md">Fast frakt 39 kr - Bestill før 10. desember for å få pakken hjem før jul </p>
        </div>
      <div>
        
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="" element={<Home />} />
          <Route path="/produkter" element={<AllProducts />} />
          <Route path="/om" element={<About />} />
          <Route path="/kontakt" element={<Contact />} />
          <Route  path="/produkt/:handle" element={<ProductSpecific />} />
          <Route path="/handlekurv" element={<ShoppingCart />} />
          <Route path="/kjøpsbetingelser" element={<Policy/>} />
          <Route path="/sikkerhet-personvern" element={<PrivacyPolicy/>} />
          <Route path="/frakt-retur" element={<ShippingAndReturns/>} />
          <Route path="*" element={<RouteNotFound />} />
        </Route>
      </Routes>
      </div>
    </div>
    </HeadProvider>
  )
}

export default App
