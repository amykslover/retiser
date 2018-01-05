import React from "react";
import Hero from "../components/Hero";
import Button from "../components/Button";
import ButtonBar from "../components/ButtonBar";
import LoginGoogle from "../components/Login";
import "./Home.css";

const Home = () =>
  <div className="bodyBackground">
    <Hero backgroundImage="https://banyanhill.com/wp-content/uploads/not-too-late-for-retirement.jpg">
      <h1>Retiser</h1>
      <h2>Optimizing you retirement savings plan.</h2>
    </Hero>
    <ButtonBar />
    <div className="bodyBackground"></div>
  </div>

export default Home;