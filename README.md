# Football Scores App

A full-stack football scores dashboard that fetches real-time data from SofaScore's unofficial API.

## Features

- View all scheduled football matches for today
- See live matches with real-time scores
- Matches grouped by tournament/league
- Match status: live minute, kick-off time, half-time, full-time
- Dark theme sports dashboard UI

## Project Structure

```
/
├── backend/               # Express.js proxy server
│   ├── package.json
│   ├── server.js          # Entry point (port 5000)
│   └── routes/scores.js   # SofaScore API proxy routes
└── frontend/              # React app
    ├── package.json
    ├── public/index.html
    └── src/
        ├── index.js
        ├── App.js         # Main app with tab navigation
        ├── App.css        # Dark theme styles
        └── components/
            ├── ScoresList.js   # Grouped match list
            └── MatchCard.js    # Individual match display
```

## Setup & Running

### 1. Install dependencies

```bash
cd backend && npm install
cd ../frontend && npm install
```

### 2. Start the backend

```bash
cd backend
npm start
# Server runs on http://localhost:5000
```

### 3. Start the frontend

```bash
cd frontend
npm start
# App opens on http://localhost:3000
```

## API Endpoints

| Endpoint | Description |
|---|---|
| `GET /api/scores/today` | All scheduled football matches for today |
| `GET /api/scores/live` | All currently live football matches |

## Data Source

Data is proxied from the SofaScore unofficial API:
- Today's matches: `https://api.sofascore.com/api/v1/sport/football/scheduled-events/{YYYY-MM-DD}`
- Live matches: `https://api.sofascore.com/api/v1/sport/football/events/live`
