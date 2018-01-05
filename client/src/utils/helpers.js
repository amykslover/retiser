//This is the file where AJAX calls from the front end to the back end will live


//Send login data to


//Send user data to correct endpoint


import axios from "axios";

// Helper Functions
const helpers = {

  saveUser: function(userData) {

    return axios.post("/api/users/login", userData)
    .then(function(results) {
        console.log("axios results", results);
        return results;
      });
  },

  getAccounts: function(userId) {

    return axios.get("/api/users/" + userId)
      .then(function(results) {
        console.log("axios results", results);
        return results;
      })
  },
  getAccount: function(accountId) {
    return axios.get(`/api/account/${accountId}`)

      .then(function(results) {
        console.log("axios results", results);
        return results;
      })
  },

  getUserTransactions: function(userId) {

    return axios.get(`/api/users/${userId}/transactions`)
      .then(function(results) {
        console.log("axios results", results);
        return results;
      })
  },

  getTransactions: function(accountId) {

    return axios.get(`/api/account/${accountId}`)

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

  addAccount: function(userId, accountNumber, accountType, accountInstitution, accountTransactions) {

    return axios({
      method: 'post',
      url: `/api/users/${userId}/account`,
      data: {
        userId: userId,
        accountNumber: accountNumber,
        accountType: accountType,
        accountInstitution: accountInstitution,
        accountTransactions: accountTransactions
      }
    }).then(function(results) {
        console.log("axios results", results);
        return results;
      })
  }
};


export default helpers;
