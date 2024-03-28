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

  const handleUsernameSubmit = async (submittedUsername) => {
    try {
      setIsLoading(true);
      setError('');
      const userRepos = await fetchUserRepos(submittedUsername);
      setRepos(userRepos);
      setIsLoading(false);
      // Aqui você irá processar e passar os dados para o componente de timeline
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
  };

  return (
    <div className="App">
      <h1>GitHub Timeline</h1>
      <UserInputComponent onUsernameSubmit={handleUsernameSubmit} />
      {isLoading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
      <TimelineComponent repos={repos} /> {/* Inclua o componente Timeline aqui */}
    </div>
  );
}

export default App;