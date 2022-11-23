import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';
const axios = require('axios');

const App = () => {

  const [repos, setRepos] = useState([]);

  const search = (term) => {
    console.log(`${term} was searched`);
    //this should be sending post request with the username as a paremter
    axios.post('/', {username: term})
    .then(function (response) {
      console.log('successful post request :', response);
      getRepos();
    })
    .catch(function (error) {
      console.log('ERROR in post request :', error);
    });
    //do another .then to run a get request to update the repo lsit
  }
  const getRepos = () => {
    axios.get('http://localhost:1128/repos')
      .then(function (res) {
        console.log(res.data, 'successful get');
        setRepos(res.data);
      })
      .catch(function(err) {
        console.log(err, 'Error in get');
      });
  }
  getRepos();

  return (
    <div>
      <h1>Github Fetcher</h1>
      <RepoList repos={repos}/>
      <Search onSearch={search}/>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('app'));
