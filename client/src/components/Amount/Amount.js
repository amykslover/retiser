import React from 'react';
import { Panel } from 'react-bootstrap';
import "./Amount.css";

const Amount = ({ type = "default", className, children, text }) => 

(
	<div id="amountbox" className={["btn", `btn-${type}`, className].join(" ")}>
		<h1>{text}</h1> 
	</div>
);


export default Amount;