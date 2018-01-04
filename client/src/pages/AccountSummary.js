import React, { Component } from "react";
import Navbar from "../components/Navbar";
import Accounts from "../components/Accounts";
import AddAccount from "../components/AddAccount";
import Portfolio from "../components/Portfolio";
import helpers from '../utils/helpers.js';

class AccountSummary extends Component {
  
  constructor(props) {
    super(props);
  
    this.state = {
            userId:     '',
            accounts: '', 
            age:      '', 
            agi:      '', 
            name:     ''
    }
  }

  componentDidMount() {
  var userId = sessionStorage.getItem('userId');

  this.setState({
    userId: userId
  })

 	this.getAllAccounts(userId);
  }
  
  getAllAccounts = user => {
    helpers.getAccounts(user).then(response => {
        // console.log(response.data)
        //   var json = JSON.stringify(response.data);
        //   console.log(json)
          
          this.setState({
            accounts: response.data.Accounts, 
            age:      response.data.age, 
            agi:      response.data.agi, 
            name:     response.data.firstname
          })
          console.log(this.state)
        });
  }


render() {
    return (
      <div>
		<Navbar
      name={this.state.name}
      user={this.state.userId}
    />
    <Portfolio
      age={this.state.age}  
      agi={this.state.agi}
    />
    <AddAccount
      user={this.state.userId}
    />
		<Accounts user={this.state.userId} accounts={this.state.accounts}/>
      </div>
    );
  }
}

export default AccountSummary;
