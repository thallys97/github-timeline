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

  const handleUsernameSubmit = async (submittedUsername) => {
    try {
      setIsLoading(true);
      setError('');
      const userRepos = await fetchUserRepos(submittedUsername);
      setRepos(userRepos);
      setHasSearched(true); // Seta como verdadeiro apenas após obter os repositórios com sucesso
      setIsLoading(false);
    } catch (error) {
      setError(error.message);
      setRepos([]); // Limpe os repositórios em caso de erro para garantir que a mensagem correta seja exibida
      setHasSearched(false); // Reset hasSearched se houver um erro
      setIsLoading(false);
    }
  };

  const handleClearSearch = () => {
    setRepos([]);
    setError('');
    setHasSearched(false);
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
    </div>
  );
}

export default App;