import React from "react";
import About from "./About/About";
import Landing from "./Landing/Landing";

// import Showcase from "./Showcase/Showcase";
import Features from "./Features/Features";
import ModalDialog from "../Models/Modal";
const Home = () => {
  return (
    <>
    <div className="container mt-3">
      <ModalDialog />
    </div>
    <Landing/>
    <Features/>
    {/* <Showcase/> */}
    <About/>
    </>
  );
}

export default Home;

