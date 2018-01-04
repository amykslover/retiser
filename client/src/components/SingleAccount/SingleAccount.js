import React, { Component } from 'react';
import { Panel } from 'react-bootstrap';
import { Link } from "react-router-dom";
import Amount from "../Amount"
import "./SingleAccount.css";
import helpers from '../../utils/helpers.js';


class SingleAccount extends Component {

	transactionFilter(transactions, timeperiod, category) {
		// console.log("================",timeperiod, category)
		return transactions.filter(trans => trans.year === timeperiod && trans.category === category)
	}


	removeAccount = accountId => {
		helpers.deleteAccount(accountId).then(response => {
			console.log(response);
		});
	}

	render() {
		const { user, account } = this.props
		var goal = 18000;


		const accountinfo = (
			<div>
				<i className="fa fa-cog pull-right"></i>

				<Link to={user + "/account/" + account.id}>
				  <p>{account.type}  {account.number}</p>
				  <h2>{account.institution}</h2>
	  			</Link>
			</div>
		);


		return (
			<li>
				<Panel header={accountinfo}>

				<div className="panelsummary">
				<Amount
				label="Total Balance"
				value={account.Transactions}
				/>
				<Amount
				label="Employee Contribution YTD"
				value={this.transactionFilter(account.Transactions, 2017,'Contribution')}
				/>
				<Amount 
				label="Employer Contribution YTD"
				value={this.transactionFilter(account.Transactions, 2017,'Employer Contribution')}
				/>
				<Amount
				label="Dividend YTD"
				value={this.transactionFilter(account.Transactions, 2017,'Dividend')}
				/>
				<Amount
				label="Fees YTD"
				value={this.transactionFilter(account.Transactions, 2017,'Fee')}
				/>
				</div>

  				</Panel>
			</li>
		);

	}
}

export default SingleAccount;
