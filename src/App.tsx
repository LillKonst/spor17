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

function App() {
  

  return (
    <HeadProvider>
    <Title>Spor 17</Title>
    <Meta name="description" content="Velkommen til Spor 17" />
    <Meta property="og:title" content="Spor 17" />
    <Meta property="og:image" content="/SPOR17-TOG-LOGOimg.png" />
    <Link rel="icon" href="/fav-icon.svg" />
    <div className="bg-background h-full relative">
       <div className="bg-customGreen rounded p-1 absolute top-0 left-0 right-0 md:h-7 w-full text-center z-0 mb-10">
          <p className="text-xs sm:text-sm md:text-md">LANSERINGS TILBUD T.O.M 10. NOVEMBER ! 10 % PÅ ALLE VARER</p>
        </div>
      <div className="px-5" >
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="" element={<Home />} />
          <Route path="/AllProducts" element={<AllProducts />} />
          <Route path="/About" element={<About />} />
          <Route path="/Contact" element={<Contact />} />
          <Route  path="/product/:handle" element={<ProductSpecific />} />
          <Route path="/cart" element={<ShoppingCart />} />
          <Route path="*" element={<RouteNotFound />} />
        </Route>
      </Routes>
      </div>
    </div>
    </HeadProvider>
  )
}

export default App
