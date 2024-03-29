//import logo from './logo.svg';
import React, { useState } from 'react';
import './App.css';
import UserInputComponent from './components/UserInputComponent';
import TimelineComponent from './components/TimelineComponent';
import SummaryComponent from './components/SummaryComponent';
import { fetchUserRepos } from './services/GitHubService';
import { fetchAllUserRepos } from './services/GitHubService';

function App() {
  const [repos, setRepos] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false); // Novo estado para rastrear se a busca foi realizada
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [repoSummary, setRepoSummary] = useState(null);

  const handleUsernameSubmit = async (submittedUsername) => {
    setPage(1);
    setHasMore(true);
    fetchRepos(submittedUsername, 1);
  };

  const fetchRepos = async (username, page) => {
    try {
      setIsLoading(true);
      setError('');
      const userRepos = await fetchUserRepos(username, page);
      if (page === 1) {
        setRepos(userRepos);
      } else {
        setRepos(prevRepos => [...prevRepos, ...userRepos]);
      }
      const allUserRepos = await fetchAllUserRepos(username);
      setHasSearched(true);
      setIsLoading(false);
      setHasMore(userRepos.length === 30);
      // Adiciona a chamada para criar o sumário
      const summary = createRepoSummary(allUserRepos);
      setRepoSummary(summary);
    } catch (error) {
      setError(error.message);
      setRepos([]);
      setIsLoading(false);
      setHasSearched(false);
      setHasMore(false);
      setRepoSummary(null);
    }
  };

  const handleLoadMore = () => {
    fetchRepos(repos[0].owner.login, page + 1);
    setPage(prevPage => prevPage + 1);
  };

  const handleClearSearch = () => {
    setRepos([]);
    setError('');
    setHasSearched(false);
    setPage(1);
    setHasMore(true);
    setRepoSummary(null);
  };

  // Função para criar o sumário de repositórios e ordená-lo
const createRepoSummary = (repos) => {
  const summary = repos.reduce((acc, repo) => {
    const year = new Date(repo.created_at).getFullYear();
    acc[year] = (acc[year] || 0) + 1;
    return acc;
  }, {});

  // Convertendo o objeto em array e ordenando por ano decrescente
  const sortedSummary = Object.entries(summary).sort((a, b) => b[0] - a[0]);

  // Convertendo de volta para objeto
  return sortedSummary.reduce((obj, [year, count]) => {
    obj[year] = count;
    return obj;
  }, {});
};



  return (
    <div className="App">
      <h1>GitHub Timeline</h1>
      <UserInputComponent 
        onUsernameSubmit={handleUsernameSubmit} 
        hasSearched={hasSearched}
        onClearSearch={handleClearSearch}
      />
      {isLoading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
      {/* Adicionar o SummaryComponent antes do TimelineComponent */}
      <SummaryComponent repoSummary={repoSummary} />
      <TimelineComponent repos={repos} hasSearched={hasSearched} />
      {hasSearched && hasMore && !isLoading && (
        <button onClick={handleLoadMore}>Load more</button>
      )}
    </div>
  );
}

export default App;