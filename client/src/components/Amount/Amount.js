import React from 'react';
import { Panel } from 'react-bootstrap';
import "./Amount.css";
import NumberFormat from 'react-number-format';

const Amount = ({ type = "default", className, children, label, value }) => {

	console.log(value)
	let results = 0
	for (let i = 0; i < value.length; i++) {
		results += parseFloat(value[i].amount)
		console.log(results);
	}

return (
	<div id="amountbox" className={["btn", `btn-${type}`, className].join(" ")}>
		<p className="amountLabel">{label}</p>
		<NumberFormat value={results} displayType={'text'} decimalScale={2} fixedDecimalScale={true} thousandSeparator={true} prefix={'$'} renderText={value => <div>{value}</div>} />
	</div>
);
}


export default Amount;