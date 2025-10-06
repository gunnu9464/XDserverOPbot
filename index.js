const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Basic route to confirm bot is alive
app.get('/', (req, res) => {
  res.send('Bot is running!');
});

// Start the server
app.listen(port, () => {
  console.log(`Bot is live on port ${port}`);
});
