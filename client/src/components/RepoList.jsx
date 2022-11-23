import React from 'react';

const RepoList = ({ repos }) => (
  <div>
    <h4> Repo List Component </h4>
    <div>
      {repos.map((repo, index) => {
        return <li key={index}>{repo.repoTitle}{' ' + repo.forkNum + ' '}<a href={repo.url}>{repo.url}</a></li>
      })}
    </div>
  </div>
)

export default RepoList;
