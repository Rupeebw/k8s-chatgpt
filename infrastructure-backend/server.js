const express = require('express');
const cors = require('cors');
const { exec } = require('child_process');

const app = express();
app.use(cors());
app.use(express.json());

// Add a route for the root URL
app.get('/', (req, res) => {
  res.send('Infrastructure Management API is running');
});

app.post('/api/command', (req, res) => {
  const { command } = req.body;
  
  if (!command.startsWith('gcloud')) {
    return res.status(400).json({ error: 'Only gcloud commands are supported' });
  }

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return res.status(500).json({ error: error.message });
    }
    res.json({ result: stdout });
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));