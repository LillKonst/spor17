import { Routes, Route } from "react-router-dom";
import { RouteNotFound } from "./components/Layout/Header/Header";
import Layout from "./components/Layout/Layout";
import Home from "./routes/Home/Home";
import About from "./routes/About/About";
import Contact from "./routes/Contact/Contact";
import Products from "./routes/Products/Products";

function App() {
  

  return (
    <div className="bg-background h-screen p-5">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="" element={<Home />} />
          <Route path="" element={<Products />} />
          <Route path="" element={<About />} />
          <Route path="" element={<Contact />} />
          <Route path="*" element={<RouteNotFound />} />
        </Route>
      </Routes>

    </div>
  )
}

export default App
