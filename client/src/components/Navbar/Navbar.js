import React, { Component } from 'react';
import "./Navbar.css";

class Navbar extends Component {

  render() {

    console.log(this.props);
    
    return(
      <nav className="navbar navbar-default navbar-static-top">
        <div className="container-fluid">
          <div className="navbar-header">
            <button type="button" className="collapsed navbar-toggle">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar" />
              <span className="icon-bar" />
              <span className="icon-bar" />
            </button>
            <a href="/" className="navbar-brand">
              Retiser
            </a>
            <span className="demographics"> Age: {this.props.age}</span>
            <span className="demographics"> AGI: {this.props.agi}</span>
          </div>
        </div>
      </nav>
    );
  }
}

export default Navbar;