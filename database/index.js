const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/1128', { useNewUrlParser: true, useUnifiedTopology: true });


let repoSchema = mongoose.Schema({
  repoTitle: String,
  url: String,
  forkNum: Number,
  username: String
});

let Repos = mongoose.model('Repos', repoSchema);

//const newRepoTest = new Repo({repoTitle: 'repoTitle', url: 'url', forkNum: 122, username: 'repoUsername'});


//I don't use this
let retrieve = (callback) => {
  console.log('is this even working in retrieve');
  console.log('this should be my repos list', Repos.find());
  callback(err, Repos.find());
}

let save = (repoList) => {
  //console.log('repoList inside save', repoList, 'this is repoList ^');
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB
  //no need for collection, just insert and make document for each repo.
  Repos.insertMany(repoList)
    .then(() => {
      console.log('data Inserted')
    }).catch((err) => {
      console.log('data not inserted ERROR in save', err);
    });
}

module.exports.save = save;
module.exports.retrieve = retrieve;
module.exports.Repos = Repos;