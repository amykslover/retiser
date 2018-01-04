import React, { Component } from "react";
import { GoogleLogin } from 'react-google-login-component';
import helpers from '../../utils/helpers.js';
import "./Login.css";
import { Link } from "react-router-dom";
import { browserHistory } from "react-router";

class LoginGoogle extends Component {
  
  constructor (props, context) {
    super(props, context);
    this.state= {
      isLoggedIn: false,
      name: '',
      userId: ''
    }
  }


  getOrCreateUser = user => {

    helpers.saveUser(user).then(response => {
      
      sessionStorage.setItem('userId', response.data.id)

      this.setState({
        userId: response.data.id, 
        isLoggedIn: true, 
        name: response.data.firstname
      })

      window.location.href=`/${response.data.id}`

    });
  }

  responseGoogle = googleUser => {
    let id_token = googleUser.getAuthResponse().id_token;
    let authResponse = googleUser.getAuthResponse();
    let profile = googleUser.getBasicProfile();


    let userObject = {
      google_id: profile.getId(),
      email: profile.getEmail(),
      fullname: profile.getName(),
      firstName: profile.getGivenName(), 
      lastName: profile.getFamilyName()
      // image: profile.getImageUrl()
    };
    this.getOrCreateUser(userObject);

  }

 
  render () {
    return (
        <GoogleLogin 
        className="btn btn-danger sharp"
        socialId="994988900752-9cm4rsp64s0455m2ja0qugrbrqacomkp.apps.googleusercontent.com"
        scope="profile"
        fetchBasicProfile={true}
        responseHandler={this.responseGoogle}
        buttonText="   Login"
        >

        <span className="fa fa-google-plus"></span>
        </GoogleLogin>
    );
  }
 
} 
export default LoginGoogle;