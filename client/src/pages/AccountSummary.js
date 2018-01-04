import React, { Component } from "react";
import Navbar from "../components/Navbar";
import Accounts from "../components/Accounts";
import AddAccount from "../components/AddAccount";
import helpers from '../utils/helpers.js';

class AccountSummary extends Component {

  getAllAccounts = user => {
    helpers.getAccounts(user).then(response => {
    		console.log(response.data)
          var json = JSON.stringify(response.data);
          console.log(json)
          this.setState({
          	user:     response.data.id,
          	accounts: response.data.Accounts, 
          	age:      response.data.age, 
          	agi:      response.data.agi, 
          	name:     response.data.name
          })
          console.log(this.state)
        });
  }

  componentDidMount() {

  console.log(sessionStorage.getItem('userId'));
  var user = this.props.match.params.id;
 	console.log(user);
 	this.getAllAccounts(user);
  }

  state = {

  };


render() {
    return (
      <div>
		<Navbar user={this.state.user} name={this.state.name} age={this.state.age}  agi={this.state.agi}/>
		<AddAccount />
		<Accounts user={this.state.user} accounts={this.state.accounts}/>
      </div>
    );
  }
}

export default AccountSummary;
