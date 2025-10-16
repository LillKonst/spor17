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
    <div className="bg-background h-full p-2 xs:p-5">
      <div className="mx-auto p-2 xs:px-5 lg:px-12">
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
