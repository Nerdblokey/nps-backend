const express = require('express');
const cors = require('cors');

const app = express();

// Enable CORS for all origins (temporary testing)
app.use(cors());

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// IMPORTANT: 0.0.0.0 to expose externally
const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});
