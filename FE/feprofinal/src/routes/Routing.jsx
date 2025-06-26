import { BrowserRouter, Routes, Route } from "react-router-dom";
import Privada from "./Privada";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Registro from "../pages/Registro";
import Perfil from "../pages/Perfil";
import Campaña from "../pages/Campaña";
import Admin from "../pages/Admin";
import Inscripcion from "../pages/Inscripcion";
import Contacto from "../pages/Contacto";
import Comunidad from "../pages/Comunidad";


function Routing() {
    return (
    <BrowserRouter>
      <Routes>
                {/*rutas públicas */}
                <Route path="/" element={<Home />} /> 
                <Route path="/login" element={<Login />} />
                <Route path="/registro" element={<Registro />} /> 
                <Route path="/home" element={<Home />} /> 
                <Route path="/inscripcion" element={<Inscripcion />} />
                <Route path="/contacto" element={<Contacto />} />
                <Route path="/comunidad" element={<Comunidad />} />
                {/*rutas privadas */}
                {<Route path="/admin" element={<Privada children={<Privada children={<Admin/>}/>} />} />}
                <Route path="/campaña" element={<Privada children={<Privada children={<Campaña/>}/>} />} /> 
                <Route path="/inscripcion" element={<Privada children={<Privada children={<Inscripcion/>}/>} />} /> 
                <Route path="/perfil" element={<Privada children={<Privada children={<Perfil/>}/>} />} />       
      </Routes>
    </BrowserRouter>
  );
}

export default Routing; 

