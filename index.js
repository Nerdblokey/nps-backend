const express = require('express');
const cors = require('cors');
const { pool } = require('./db');  // 👈 ADD THIS LINE

const app = express();
const db = require('./db');

app.use(cors());
app.use(express.json());

// Health check endpoint (this stays)
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// GET Surveys Endpoint 👇 NEW
app.get('/api/surveys', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM surveys');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

// Existing NPS Submission Endpoint (leave it)
app.post('/api/submit', async (req, res) => {
  const { email, score, feedback } = req.body;
  try {
    await db.query(
      'INSERT INTO surveys (email, score, feedback, created_at) VALUES ($1, $2, $3, NOW())',
      [email, score, feedback]
    );
    res.json({ message: 'Survey saved successfully' });
  } catch (error) {
    console.error('Database insert error:', error);
    res.status(500).json({ error: 'Failed to save survey' });
  }
});
