import React, { useState } from 'react';

function UserInputComponent({ onUsernameSubmit, hasSearched, onClearSearch }) {
  const [username, setUsername] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if(username) {
      onUsernameSubmit(username);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username-input">GitHub Username:</label>
        <input
          id="username-input"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter GitHub Username"
          required
        />
        <button type="submit">Generate Timeline</button>
        {hasSearched && (
          <button type="button" onClick={onClearSearch}>Clear Search</button>
        )}
      </form>
    </div>
  );
}

export default UserInputComponent;
