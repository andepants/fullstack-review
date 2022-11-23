const axios = require('axios');
const config = require('../config.js');

let getReposByUsername = (urlPath) => {
  // TODO - Use the axios module to request repos for a specific
  // user from the github API

  //ex url https://github.com/kylef
  //get request to get list of repositories /users/{kylef}/repos
  //https://docs.github.com/en/rest/repos/repos#list-repositories-for-a-user

  // The options object has been provided to help you out,
  // but you'll have to fill in the URL
  let options = {
    url: urlPath,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }
  };
 //url path is http github/api/user/${username}/
  return axios.get(urlPath, options)
  .then(function (response) {
    //console.log('successful api call', response.data, 'was success');
    return response.data
  })
  .catch(function (error) {
    //console.log('ERRROR in API CALL', error, 'ERRor in API call');
  });
}

module.exports.getReposByUsername = getReposByUsername;