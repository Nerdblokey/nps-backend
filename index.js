const express = require('express');
const cors = require('cors');
const app = express();

// Allow Vercel Frontend to access this API
app.use(cors({
  origin: 'https://vercel.app' // You can change this to '*' if needed for testing
}));

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
