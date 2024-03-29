import React from 'react';
import '../styles/TimelineComponent.css'; // Não esqueça de criar este arquivo CSS para estilizar a linha do tempo

function TimelineComponent({ repos, hasSearched }) {

    // // Ordena os repositórios por data de última atualização em ordem descendente
    // const sortedRepos = [...repos].sort((a, b) => new Date(b.pushed_at) - new Date(a.pushed_at));

    // Só exibirá a mensagem se a busca foi realizada e nenhum repositório foi encontrado
    if (hasSearched && !repos.length) return <p>No repositories found.</p>;

    return (
      <div className="timeline-container">
        {repos.map((repo, index) => (
          <div key={index} className="timeline-item">
            <div className="timeline-dot"></div>
            {/* <div className="timeline-date">{new Date(repo.created_at).getFullYear()}</div> */}
            <div className="timeline-content">
              <h2>{repo.name}</h2>
              <p>{repo.description}</p>
              <p>created at: {new Date(repo.created_at).toLocaleDateString()}</p>
              {repo.fork && <p className="forked-info">Forked from another repository</p>}
              <p>Last updated: {new Date(repo.pushed_at).toLocaleDateString()}</p>
              <p>Stars: {repo.stargazers_count}</p>
              <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                View on GitHub
              </a>
            </div>
          </div>
        ))}
      </div>
    );
  }


export default TimelineComponent;