import React from 'react';
import { Panel } from 'react-bootstrap';
import "./PortfolioAmount.css";
import NumberFormat from 'react-number-format';

const PortfolioAmount = ({ type = "default", className, children, value }) => {
	
	console.log(value)
	let results = 0
	for (let i = 0; i < value.length; i++) {
		results += parseFloat(value[i].amount)
	}

return (
	<div id="amountbox" className={["btn", `btn-${type}`, className].join(" ")}>
		<NumberFormat value={results} displayType={'text'} decimalScale={2} fixedDecimalScale={true} thousandSeparator={true} prefix={'$'} renderText={value => <div>{value}</div>} />
	</div>
);
}


export default PortfolioAmount;