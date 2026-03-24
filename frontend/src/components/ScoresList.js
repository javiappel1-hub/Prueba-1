import React from 'react';
import MatchCard from './MatchCard';

function ScoresList({ matches, activeTab }) {
  if (matches.length === 0) {
    return (
      <div className="empty-state">
        <span className="empty-icon">⚽</span>
        <p>
          {activeTab === 'live'
            ? 'No live matches at the moment.'
            : 'No matches scheduled for today.'}
        </p>
      </div>
    );
  }

  // Group matches by tournament
  const grouped = matches.reduce((acc, match) => {
    const tournamentName = match.tournament?.name || 'Other';
    const categoryName = match.tournament?.category?.name || '';
    const key = tournamentName;
    if (!acc[key]) {
      acc[key] = {
        tournamentName,
        categoryName,
        matches: [],
      };
    }
    acc[key].matches.push(match);
    return acc;
  }, {});

  const groupEntries = Object.entries(grouped);

  return (
    <div className="scores-list">
      {groupEntries.map(([key, group]) => (
        <div key={key} className="tournament-group">
          <div className="tournament-header">
            <span className="tournament-flag">🏆</span>
            <span className="tournament-name">
              {group.categoryName ? `${group.categoryName} — ` : ''}
              {group.tournamentName}
            </span>
          </div>
          {group.matches.map((match) => (
            <MatchCard key={match.id} match={match} />
          ))}
        </div>
      ))}
    </div>
  );
}

export default ScoresList;
