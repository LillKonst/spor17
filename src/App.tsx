import { Routes, Route } from "react-router-dom";
import { RouteNotFound } from "./components/Layout/Header/Header";
import Layout from "./components/Layout/Layout";
import Home from "./routes/Home/Home";
import About from "./routes/About/About";
import Contact from "./routes/Contact/Contact";
import AllProducts from "./routes/AllProducts/AllProducts";
import ProductSpecific from "./routes/ProductSpecific/ProductSpecific";

function App() {
  

  return (
    <div className="bg-background h-screen p-5 px-10">
      <div className="container mx-auto px-12">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="" element={<Home />} />
          <Route path="/AllProducts" element={<AllProducts />} />
          <Route path="/About" element={<About />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/ProductSpecific/:id" element={<ProductSpecific />} />
          <Route path="*" element={<RouteNotFound />} />
        </Route>
      </Routes>
      </div>
    </div>
  )
}

export default App
