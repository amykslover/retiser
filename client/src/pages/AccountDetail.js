import React, { Component } from "react";
import Navbar from "../components/Navbar";
import Detail from "../components/Detail";
import helpers from '../utils/helpers.js';

class AccountDetail extends Component {
  getAllTransactions = (user, account) => {

    helpers.getTransactions(user, account).then(response => {

          console.log(`Transactions Retrieved: ${JSON.stringify(response.data)}`);
          this.setState({transactions: response.data})
          console.log(this.state)
        });
  }

  componentDidMount() {
  console.log('================================');  
  const user = this.props.match.params.id;
  console.log(user);
  const account = this.props.match.params.accountid;
 	console.log(account);
 	this.getAllTransactions(user, account);
  }

  state = {
  	age: 35,
  	agi: 150000,
  	name: 'Amy'
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
