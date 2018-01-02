import React, { Component } from 'react';
import { Panel } from 'react-bootstrap';
import Amount from "../Amount"
import "./SingleAccount.css";

class SingleAccount extends Component {

	render() {

	var goal = 18000;
	console.log(goal)
	const accountinfo = (
		<div>
		<i className="fa fa-cog pull-right"></i>
		  <p>{this.props.account.type}  {this.props.account.number}</p>
		  <h2>{this.props.account.institution}</h2>
		</div>
	);

		return (
			<li>
				<Panel header={accountinfo}>

				<div className="panelsummary">
				<Amount text={this.props.account.bTotal}/>
				<Amount text={this.props.account.bYTD}/>
				<Amount text={this.props.account.cYTD}/>
				<Amount text={goal - this.props.account.cYTD}/>
				</div>

  				</Panel>
			</li>
		);

	}
}

export default SingleAccount;
