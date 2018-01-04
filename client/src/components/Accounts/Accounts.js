import React, { Component } from 'react';
import SingleAccount from '../SingleAccount'
import "./Accounts.css";


class Accounts extends Component {

	render() {
		const user = this.props.user;
		let userAccounts = this.props.accounts;

		if(userAccounts) {
			userAccounts = userAccounts.map(account => {
				console.log(account);
				return (
					<SingleAccount key={account.number} account={account} user={user}/>
				);
			});
		}
		
		return(
			<ul>
			{userAccounts}
			</ul>

			);
		
	}

	
}

export default Accounts;