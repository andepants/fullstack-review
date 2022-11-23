const helpers = require('../helpers/github.js');
const database = require('../database/index.js');
const express = require('express');
let app = express();

// TODO - your code here!
// Set up static file service for files in the `client/dist` directory.
// Webpack is configured to generate files in that directory and
// this server must serve those files when requested.
app.use(express.static('client/dist'));
app.use(express.json());
//middleware
//need express.json to parse incoming data

app.post('/', async function(req, res) {
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
  //console.log('username is :', req.body.username);
  let urlPath = `https://api.github.com/users/${req.body.username}/repos`
  //console.log('urlPath is :', urlPath, 'the url path');
  //chain promises instead of using let
  let repoList = await helpers.getReposByUsername(urlPath)
    .then(data => {
      let repoArray = [];
      //console.log('this is suppposed to be repoList data from githubAPI', data);
      for (let i = 0; i < data.data.length; i++) {
        repoArray.push({repoTitle: data.data[i].name, url: data.data[i].url, forkNum: data.data[i].forks_count})
      }
      database.save(repoArray);
      //data.data.url, data.data.forks_count)
      //database.save(data);
    }).catch(error => {
      console.log('ERRROR in APP.POST', error, 'an error');
    });
});
//promise chaining - look at docs
//await asynch

//look up promise docs or callback functions, once axios resolves, run callback, or asynch await
//https://api.github.com/users
app.get('/repos', function (req, res) {
  database.Repos.find().sort({forkNum: -1}).limit(25)
    .then((data) => {
      res.end(JSON.stringify(data));
    })
  // database.retrieve((err, data) => {
  //   if (err) {
  //     res.send(400).send('error in app.get');
  //   } else {
  //     res.status(200).send('data was sent baby', data);
  //   }
  //});
  // TODO - your code here!
  // This route should send back the top 25 repos
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});
