import React, { Component } from 'react';
import SingleAccount from '../SingleAccount'
import "./Accounts.css";


class Accounts extends Component {

	render() {
		let accounts;
		if(this.props.accounts) {
			accounts = this.props.accounts.map(account => {
				console.log(account);
				return (
					<SingleAccount key={account.number} account={account} />
				);
			});
		}
		console.log(this.props);
		
		return(
			<ul>
			{accounts}
			</ul>

			);
		
	}

	
}

export default Accounts;