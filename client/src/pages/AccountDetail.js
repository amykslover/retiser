import React, { Component } from "react";
import Navbar from "../components/Navbar";
import Detail from "../components/Detail";

class AccountDetail extends Component {
  state = {
  	age: 35,
  	agi: 150000,
  	account: 123456789,
  	institution: "Pensys",
  	account_type: "401k",
  	transactions: [
	  	{
	  		id: 1,
	  		tx_amount: 100,
	  		tx_description: 'Administrative Fee',
	  		tx_category: 'Fee',
	  		tx_date: '2017-01-02'
	  	},
	  	{
	  		id: 2,
	  		tx_amount: 400,
	  		tx_description: 'Safe Harbor Match',
	  		tx_category: 'Employer Contribution',
	  		tx_date: '2017-01-15'
	  	},
	  	{
	  		id: 3,
	  		tx_amount: 800,
	  		tx_description: 'Pre-Tax Payroll Deduction',
	  		tx_category: 'Employee Contribution',
	  		tx_date: '2017-01-15'
	  	}
  	]
  };


render() {
    return (
      <div>
		<Navbar age={this.state.age}  agi={this.state.agi}/>
		<Detail transactions={this.state.transactions}/>
      </div>
    );
  }
}

export default AccountDetail;
