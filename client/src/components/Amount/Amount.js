import React from 'react';
import { Panel } from 'react-bootstrap';
import "./Amount.css";

const Amount = ({ type = "default", className, children, value }) => {
  // value.reduce((acc, item) => {
		// return parseFloat(acc) + parseFloat(item.amount)
	// }, 0)
	let results = 0
	for (var i = 0; i < value.length; i++) {
		results += parseFloat(value[i].amount)
	}
return (
	<div id="amountbox" className={["btn", `btn-${type}`, className].join(" ")}>
		<p className="value">{results}</p> 
	</div>
);
}


export default Amount;