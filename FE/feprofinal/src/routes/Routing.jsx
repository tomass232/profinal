import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Registro from "../pages/Registro";
import Perfil from "../pages/Perfil";
import Campaña from "../pages/Campaña";
import Admin from "../pages/Admin";
import Inscripcion from "../pages/Inscripcion";

function Routing() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Home />} />
        <Route path="/h" element={<Home />} />        
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/inscripcion" element={<Inscripcion />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/campaña" element={<Campaña />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Routing;
