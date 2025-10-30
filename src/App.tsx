import { Routes, Route } from "react-router-dom";
import { RouteNotFound } from "./components/Layout/Header/Header";
import Layout from "./components/Layout/Layout";
import Home from "./routes/Home/Home";
import About from "./routes/About/About";
import AllProducts from "./routes/AllProducts/AllProducts";
import ProductSpecific from "./routes/ProductSpecific/ProductSpecific";
import ShoppingCart from "./routes/ShoppingCart/ShoppingCart";
import Contact from "./routes/Contact/Contact";

function App() {
  

  return (
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
  )
}

export default App
