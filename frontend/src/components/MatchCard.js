import React from 'react';

function getStatusLabel(match) {
  const statusCode = match.status?.type;
  const statusDesc = match.status?.description || '';

  if (statusCode === 'inprogress') {
    const minute = match.time?.currentPeriodStartTimestamp
      ? null
      : null;
    return match.time?.played ? `${match.time.played}'` : 'LIVE';
  }
  if (statusCode === 'finished') return 'FT';
  if (statusCode === 'notstarted') {
    // Show kick-off time
    if (match.startTimestamp) {
      const date = new Date(match.startTimestamp * 1000);
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
    return 'NS';
  }
  if (statusCode === 'postponed') return 'PPD';
  if (statusCode === 'canceled') return 'CANC';
  if (statusCode === 'halftime') return 'HT';

  return statusDesc || statusCode || '—';
}

function getStatusClass(statusType) {
  if (statusType === 'inprogress') return 'status-live';
  if (statusType === 'finished') return 'status-finished';
  if (statusType === 'notstarted') return 'status-notstarted';
  if (statusType === 'halftime') return 'status-live';
  return 'status-default';
}

function getCardClass(statusType) {
  if (statusType === 'inprogress' || statusType === 'halftime') return 'match-card live';
  if (statusType === 'finished') return 'match-card finished';
  return 'match-card';
}

function MatchCard({ match }) {
  const homeTeam = match.homeTeam;
  const awayTeam = match.awayTeam;
  const homeScore = match.homeScore?.current ?? '—';
  const awayScore = match.awayScore?.current ?? '—';
  const statusType = match.status?.type;
  const statusLabel = getStatusLabel(match);
  const statusClass = getStatusClass(statusType);
  const cardClass = getCardClass(statusType);

  const roundInfo = match.roundInfo?.round
    ? `Round ${match.roundInfo.round}`
    : null;

  return (
    <div className={cardClass} title={roundInfo || ''}>
      {/* Home Team */}
      <div className="team team-home">
        <span className="team-name">{homeTeam?.name || 'Home'}</span>
        {homeTeam?.shortName && homeTeam.shortName !== homeTeam.name && (
          <span className="team-shortname">{homeTeam.shortName}</span>
        )}
      </div>

      {/* Score Block */}
      <div className="score-block">
        <div className="score-display">
          <span className="score-value">{homeScore}</span>
          <span className="score-sep">:</span>
          <span className="score-value">{awayScore}</span>
        </div>
        <span className={`match-status ${statusClass}`}>{statusLabel}</span>
      </div>

      {/* Away Team */}
      <div className="team team-away">
        <span className="team-name">{awayTeam?.name || 'Away'}</span>
        {awayTeam?.shortName && awayTeam.shortName !== awayTeam.name && (
          <span className="team-shortname">{awayTeam.shortName}</span>
        )}
      </div>
    </div>
  );
}

export default MatchCard;
