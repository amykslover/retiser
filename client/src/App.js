import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./pages/Home";
import AccountDetail from "./pages/AccountDetail";
import AccountSummary from "./pages/AccountSummary";

import './App.css';

const App = () =>
  <Router>
    <div>
      <Route exact path="/" component={Home} />
      <Route exact path="/home" component={Home} />
      <Route exact path="/detail" component={AccountDetail} />
      <Route exact path="/accounts" component={AccountSummary} />
    </div>
  </Router>;

export default App;