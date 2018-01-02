import React from "react";
import Hero from "../components/Hero";
import Button from "../components/Button";
import ButtonBar from "../components/ButtonBar";
import LoginGoogle from "../components/Login";

const Home = () =>
  <div>
    <Hero backgroundImage="https://banyanhill.com/wp-content/uploads/not-too-late-for-retirement.jpg">
      <h1>Retiser</h1>
      <h2>Letting you know when you need to up your savings game.</h2>
    </Hero>
    <ButtonBar />
  </div>

export default Home;