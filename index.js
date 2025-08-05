const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());  // Allow JSON body parsing

// Health check endpoint (this stays)
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// 🟢 NEW: NPS Submission Endpoint
app.post('/api/submit', (req, res) => {
  const { email, score, feedback } = req.body;
  console.log('Received NPS Submission:', { email, score, feedback });

  // For now, just reply back with success
  res.json({ message: 'Survey submitted successfully' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
