const express = require('express');
const cors = require('cors');
const db = require('./db');  // ✅ Correct import

const app = express();

app.use(cors());
app.use(express.json());

// Health check endpoint (this stays)
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// GET Surveys Endpoint
app.get('/api/surveys', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM surveys');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

// Existing NPS Submission Endpoint
app.post('/api/submit', async (req, res) => {
  const { email, score, feedback } = req.body;

  try {
    await db.query(
      'INSERT INTO surveys (email, score, feedback, created_at) VALUES ($1, $2, $3, NOW())',
      [email, score, feedback]
    );

    res.json({ message: 'Survey submitted and saved!' });
  } catch (error) {
    console.error('Database Insert Error:', error);
    res.status(500).json({ error: 'Failed to save survey' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
