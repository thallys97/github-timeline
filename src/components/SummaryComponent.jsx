import React from 'react';
import '../styles/SummaryComponent.css'; // Não esqueça de criar este arquivo CSS para estilizar o sumário

function SummaryComponent({ repoSummary }) {
  if (!repoSummary) return null;

  // Transformar o objeto em um array para garantir a ordem na renderização
  const sortedYears = Object.entries(repoSummary).sort((a, b) => b[0] - a[0]);

  return (
    <div className="summary-container">
      {sortedYears.map(([year, count]) => (
        <div key={year} className="summary-item">
          <span className="summary-year">{year}</span>
          <span className="summary-count">{count} repos</span>
        </div>
      ))}
    </div>
  );
}


export default SummaryComponent;