import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import './App.css';
import ScoresList from './components/ScoresList';

function App() {
  const [activeTab, setActiveTab] = useState('today');
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  const fetchMatches = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const endpoint = activeTab === 'today' ? '/api/scores/today' : '/api/scores/live';
      const response = await axios.get(endpoint);
      setMatches(response.data);
      setLastUpdated(new Date().toLocaleTimeString());
    } catch (err) {
      setError('Failed to fetch matches. Please try again later.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [activeTab]);

  useEffect(() => {
    fetchMatches();
  }, [fetchMatches]);

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <div className="header-title">
            <span className="header-icon">⚽</span>
            <h1>Football Scores</h1>
          </div>
          <p className="header-date">{today}</p>
        </div>
      </header>

      <nav className="tab-nav">
        <button
          className={`tab-btn ${activeTab === 'today' ? 'active' : ''}`}
          onClick={() => setActiveTab('today')}
        >
          Today
        </button>
        <button
          className={`tab-btn ${activeTab === 'live' ? 'active' : ''}`}
          onClick={() => setActiveTab('live')}
        >
          <span className="live-dot"></span>
          Live
        </button>
      </nav>

      <main className="app-main">
        <div className="controls-bar">
          <p className="match-count">
            {!loading && !error && (
              <>
                {matches.length} {matches.length === 1 ? 'match' : 'matches'}
                {activeTab === 'live' ? ' live' : ' today'}
              </>
            )}
          </p>
          <button className="refresh-btn" onClick={fetchMatches} disabled={loading}>
            {loading ? 'Loading...' : 'Refresh'}
          </button>
        </div>

        {lastUpdated && (
          <p className="last-updated">Last updated: {lastUpdated}</p>
        )}

        {loading && (
          <div className="loading-container">
            <div className="spinner"></div>
            <p>Fetching matches...</p>
          </div>
        )}

        {error && (
          <div className="error-container">
            <p className="error-message">{error}</p>
            <button className="retry-btn" onClick={fetchMatches}>
              Try Again
            </button>
          </div>
        )}

        {!loading && !error && (
          <ScoresList matches={matches} activeTab={activeTab} />
        )}
      </main>

      <footer className="app-footer">
        <p>Data provided by SofaScore</p>
      </footer>
    </div>
  );
}

export default App;
