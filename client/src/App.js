import React from "react";
import { BrowserRouter as Router, Route, Link, Redirect, withRouter } from "react-router-dom";
import Home from "./pages/Home";
import AccountDetail from "./pages/AccountDetail";
import AccountSummary from "./pages/AccountSummary";


import './App.css';

const App = () =>
  <Router>
    <div>
      <Route exact path="/" component={Home} />
      <Route exact path="/home" component={Home} />
      <Route exact path="/:id" component={AccountSummary} />
      <Route exact path="/:id/account/:accountid" component={AccountDetail} />
    </div>
  </Router>;

export default App;