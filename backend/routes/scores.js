const express = require('express');
const axios = require('axios');
const router = express.Router();

const SOFASCORE_HEADERS = {
  'User-Agent': 'Mozilla/5.0',
  'Accept': 'application/json',
};

function getTodayDate() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

// GET /api/scores/today
router.get('/today', async (req, res) => {
  try {
    const date = getTodayDate();
    const url = `https://api.sofascore.com/api/v1/sport/football/scheduled-events/${date}`;
    const response = await axios.get(url, { headers: SOFASCORE_HEADERS });
    const events = response.data.events || [];
    res.json(events);
  } catch (error) {
    console.error('Error fetching today\'s scores:', error.message);
    res.status(500).json({ error: 'Failed to fetch today\'s scores', details: error.message });
  }
});

// GET /api/scores/live
router.get('/live', async (req, res) => {
  try {
    const url = 'https://api.sofascore.com/api/v1/sport/football/events/live';
    const response = await axios.get(url, { headers: SOFASCORE_HEADERS });
    const events = response.data.events || [];
    res.json(events);
  } catch (error) {
    console.error('Error fetching live scores:', error.message);
    res.status(500).json({ error: 'Failed to fetch live scores', details: error.message });
  }
});

module.exports = router;
