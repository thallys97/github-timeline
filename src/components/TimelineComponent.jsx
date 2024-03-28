import React from 'react';
import '../styles/TimelineComponent.css'; // Não esqueça de criar este arquivo CSS para estilizar a linha do tempo

function TimelineComponent({ repos }) {
  if (!repos.length) return <p>No repositories found.</p>;

  return (
    <div className="timeline-container">
      {repos.map((repo, index) => (
        <div key={index} className="timeline-item">
          <div className="timeline-dot"></div>
          <div className="timeline-date">{new Date(repo.created_at).getFullYear()}</div>
          <div className="timeline-content">
            <h2>{repo.name}</h2>
            <p>{repo.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default TimelineComponent;