//import logo from './logo.svg';
import React, { useState } from 'react';
import './App.css';
import UserInputComponent from './components/UserInputComponent';
import TimelineComponent from './components/TimelineComponent';
import { fetchUserRepos } from './services/GitHubService';

function App() {
  const [repos, setRepos] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false); // Novo estado para rastrear se a busca foi realizada
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

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
      setHasSearched(true);
      setIsLoading(false);
      setHasMore(userRepos.length === 30);
    } catch (error) {
      setError(error.message);
      setRepos([]);
      setIsLoading(false);
      setHasSearched(false);
      setHasMore(false);
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
      <TimelineComponent repos={repos} hasSearched={hasSearched} />
      {hasSearched && hasMore && !isLoading && (
        <button onClick={handleLoadMore}>Load more</button>
      )}
    </div>
  );
}

export default App;