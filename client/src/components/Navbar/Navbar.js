import React, { Component } from 'react';
import "./Navbar.css";
import { Link } from 'react-router'
import { NavLink } from 'react-router-dom'
class Navbar extends Component {

  render() {

    console.log(this.props);
    const user = this.props.user;
    return(
      <nav className="navbar navbar-default navbar-static-top">
        <div className="container-fluid">
          <div className="navbar-header">
            <button type="button" className="collapsed navbar-toggle">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar" />
              <span className="icon-bar" />
              <span className="icon-bar" />
              <NavLink to={`/${user}`} activeClassName="active">Accounts</NavLink>
            </button>
            <a href="/" className="navbar-brand">
              Retiser
            </a>
            <span className="demographics"> Hello {this.props.name}!</span>
            <span className="demographics"> Age: {this.props.age}</span>
            <span className="demographics"> AGI: {this.props.agi}</span>

          </div>
        </div>
      </nav>
    );
  }
}

export default Navbar;