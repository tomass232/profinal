import React from "react";
import FormLogin from "../components/FormLogin";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import BotonComponente from "../components/BotonComponente";


function Login() {
    return(
        <>
        <FormLogin/>
        <Navbar />
        <BotonComponente />
        <Footer />
        </>
)
    }

export default Login;
