import React from 'react';
import '../styles/SummaryComponent.css'; // Não esqueça de criar este arquivo CSS para estilizar o sumário

function SummaryComponent({ repoSummary }) {
  if (!repoSummary) return null;

  return (
    <div className="summary-container">
      {Object.entries(repoSummary).map(([year, count]) => (
        <div key={year} className="summary-item">
          <span className="summary-year">{year}</span>
          <span className="summary-count">{count} repos</span>
        </div>
      ))}
    </div>
  );
}

export default SummaryComponent;