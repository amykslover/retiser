import React from "react";
import "./Button.css";

// Destructuring the type, className, children and onClick props, applying them to the button element

const Button = ({ type = "default", className, user, children, onClick, text, href }) => (
	<a href={href} className={["btn", `btn-${type}`, "sharp" , className].join(" ")}>
	<span className={["fa", `fa-${user}`, className].join(" ")}></span> {text} </a>
);

export default Button;
