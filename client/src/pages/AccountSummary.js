import React, { Component } from "react";
import Navbar from "../components/Navbar";
import Accounts from "../components/Accounts";
// import EmptyPanel from "../components/AddAccount";

class AccountSummary extends Component {
  state = {
  	age: 35,
  	agi: 150000,
  	totalIRA: 0,
  	total401k: 10000,
  	accounts: [
	  	{
	  		institution: 'Vanguard',
	  		number: 'x6789',
	  		type: '401k',
	  		bTotal: 20191,
	  		bYTD: 0,
	  		cYTD: 0
	  	},
	  	{
	  		institution: 'Vanguard',
	  		number: 'x8310',
	  		type: 'RothIRA',
	  		bTotal: 22001,
	  		bYTD: 0,
	  		cYTD: 0
	  	},
	  	{
	  		institution: 'Pensys',
	  		number: 'x3019',
	  		type: '401k',
	  		bTotal: 21213,
	  		bYTD: 16840,
	  		cYTD: 10000
	  	},
	  	{
	  		institution: 'Fidelity',
	  		number: 'x3891',
	  		type: '403b',
	  		bTotal: 3456,
	  		bYTD: 500,
	  		cYTD: 0
	  	}
  	]
  };


render() {
    return (
      <div>
		<Navbar age={this.state.age}  agi={this.state.agi}/>
		<Accounts accounts={this.state.accounts}/>
      </div>
    );
  }
}

export default AccountSummary;
