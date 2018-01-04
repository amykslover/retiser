//This is the file where AJAX calls from the front end to the back end will live


//Send login data to


//Send user data to correct endpoint


import axios from "axios";

// Helper Functions
const helpers = {

  saveUser: function(userData) {
    console.log(userData)
    return axios.post("/api/users/login", userData)
    .then(function(results) {
        console.log("axios results", results);
        return results;
      });
  },

  getAccounts: function(userId) {
    console.log(userId);
    return axios.get("/api/users/" + userId)
      .then(function(results) {
        console.log("axios results", results);
        return results;
      })
  },
  getTransactions: function(userId, accountId) {
    console.log('Are we here?' + accountId);
    return axios.get(`/api/users/${userId}/account/${accountId}`)

      .then(function(results) {
        console.log("axios results", results);
        return results;
      })
  },
  //This request will overwrite the data in the existing account
  deleteAccount: function(accountId) {
    return axios.delete("/api/users/account/" + accountId)
      .then(function(results) {
        console.log("axios results", results);
        return results;
      })
  },
  //This request will overwrite the data in the existing account
  addAccount: function(accountId) {
    return axios.post("/api/users/account")
      .then(function(results) {
        console.log("axios results", results);
        return results;
      })
  }
};


export default helpers;
