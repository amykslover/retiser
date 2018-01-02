//This is the file where AJAX calls from the front end to the back end will live


//Send login data to


//Send user data to correct endpoint


import axios from "axios";

// Helper Functions
const helpers = {

  signUp: function() {
    return axios.get("/api/signup")
      .then(function(results) {

        console.log("axios results", results);
        return results;
      });
  },

  signIn: function() {
  	return axios.get("/api/login")

  },

  google: function() {
  	return axios.get("/api/auth/google")

  },

  saveUser: function(userData) {
    console.log(userData)
    return axios.post("/api/users/login", userData)
    .then(function(results) {
        console.log("axios results", results);
        return results;
      });
  },

  getAccounts: function(userId) {
    return axios.get("/api/accounts/" + userId)
      .then(function(results) {
        console.log("axios results", results);
        return results;
      })
  },
  createAccount: function(accountId) {
    return axios.get("/api/account/" + accountId)
      .then(function(results) {
        console.log("axios results", results);
        return results;
      })
  },
  //This request will overwrite the data in the existing account
  deleteAccount: function(accountId) {
    return axios.delete("/api/account/" + accountId)
      .then(function(results) {
        console.log("axios results", results);
        return results;
      })
  },
  //This request will overwrite the data in the existing account
  replaceAccount: function(accountId) {
    return axios.post("/api/account/" + accountId)
      .then(function(results) {
        console.log("axios results", results);
        return results;
      })
  }
};


export default helpers;
