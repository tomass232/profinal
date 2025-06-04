import React from "react";
import FormHome from "../components/FormHome";
import Footer from "../components/Footer";
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
    </>
  )
}

export default Home
