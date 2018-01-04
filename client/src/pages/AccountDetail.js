import React, { Component } from "react";
import Navbar from "../components/Navbar";
import Detail from "../components/Detail";
import helpers from '../utils/helpers.js';
import Accounts from "../components/Accounts";

class AccountDetail extends Component {
  constructor(props) {
    super(props);
  
    this.state = {

    }
  }

  getAllTransactions = (user, account) => {

    helpers.getTransactions(user, account).then(response => {

          // console.log(`Transactions Retrieved: ${JSON.stringify(response.data)}`);
          this.setState({transactions: response.data})
          console.log(this.state)
        });
  }

  componentDidMount() {

  var userId = sessionStorage.getItem('userId');
  
  this.setState({
    userId: userId
  })

  const account = this.props.match.params.accountid;
 	console.log(account);
 	this.getAllTransactions(userId, account);
  }


render() {
    return (
      <div>
    <Navbar
      name={this.state.name}
      user={this.state.userId}
    />
    <Detail transactions={this.state.transactions}/>
      </div>
    );
  }
}

export default AccountDetail;

    // <Accounts user={this.state.userId} accounts={this.state.accounts}/>
