import React from "react";
import FormHome from "../components/FormHome";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import "../styles/home.css";

function Home() {
  return (
    <>
      <div>
        <FormHome />
      </div>

      <div className="footer-contenedor">
        <Footer />
      </div>
      <div className="navbar-contenedor">
        <Navbar />
      </div>

    </>
  )
}

export default Home
