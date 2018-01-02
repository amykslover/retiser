import React from 'react';
import { GoogleLogin } from 'react-google-login-component';
import helpers from '../../utils/helpers.js';
import "./Login.css";

class LoginGoogle extends React.Component{
  
  constructor (props, context) {
    super(props, context);
  }

  getOrCreateUser = user => {
    // Create User only if the entry doesn't already exist.
    helpers.saveUser(user).then(res => {
          console.log(`Created: ${JSON.stringify(res.data)}`);
          this.props.onLoginChange(true, res.data.id);
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