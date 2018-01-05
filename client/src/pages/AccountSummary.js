import React, { Component } from "react";
import Navbar from "../components/Navbar";
import Accounts from "../components/Accounts";
import AddAccount from "../components/AddAccount";
import Portfolio from "../components/Portfolio";
import helpers from '../utils/helpers.js';

class AccountSummary extends Component {
  
  constructor(props) {
    super(props);
  
    this.getAllAccounts     = this.getAllAccounts.bind(this)
    this.getAllTransactions = this.getAllTransactions.bind(this)

    this.state = {
            userId:       '',
            accounts:     '', 
            age:          '', 
            agi:          '', 
            name:         '',
            transactions: ''
    }
  }



  componentDidMount() {
    var userId = sessionStorage.getItem('userId');

    this.setState({
      userId: userId
    })

    this.getAllAccounts(userId);
    this.getAllTransactions(userId);
  }
  
  getAllAccounts = user => {
    helpers.getAccounts(user).then(response => {

      this.setState({
        accounts: response.data.Accounts, 
        age:      response.data.age, 
        agi:      response.data.agi, 
        name:     response.data.firstname
      })

    });
  }

  getAllTransactions = user => {
    helpers.getUserTransactions(user).then(response => {

      this.setState({
        transactions: response.data
      })

    });
  }

render() {
    return (
      <div>
		<Navbar
      name={this.state.name}
      user={this.state.userId}
    />
    <AddAccount
      user={this.state.userId}
      getAllAccounts={this.getAllAccounts}
    />
		<Accounts user={this.state.userId} accounts={this.state.accounts}/>
      </div>
    );
  }
}

export default AccountSummary;
