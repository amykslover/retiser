//This is the file where AJAX calls from the front end to the back end will live


//Send login data to 


//Send user data to correct endpoint


import axios from "axios";

// Helper Functions
const helpers = {

  // This will return any saved articles from our database
  signIn: function() {
    return axios.get("/")
      .then(function(results) {

        console.log("axios results", results);
        return results;
      });
  },
  // This will save new articles to our database
  signUp: function() {
  	return axios.get("/login")

  },
  // This will remove saved articles from our database
  google: function() {
  	return axios.get("/auth/google")

  }
};


export default helpers;