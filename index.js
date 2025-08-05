const express = require('express');
const cors = require('cors');
const { pool } = require('./db');  // 👈 ADD THIS LINE

const app = express();
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
app.post('/api/submit', (req, res) => {
  const { email, score, feedback } = req.body;
  console.log('Received NPS Submission:', { email, score, feedback });
  res.json({ message: 'Survey submitted successfully' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
