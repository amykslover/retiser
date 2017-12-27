import React from "react";
import "./Hero.css";

const Hero = props =>
  <div
    className="hero"
    style={{ backgroundImage: `url(${props.backgroundImage})` }}
  >
    {props.children}
  </div>;

export default Hero;
