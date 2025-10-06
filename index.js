const mineflayer = require('mineflayer');

const bot = mineflayer.createBot({
  host: 'XDserverOP.aternos.me', // Your server IP
  port: 48903,                   // Your server port
  username: 'billi_mausi',       // Bot username
  version: false                 // Auto-detect version
});

const express = require('express');
const app = express();
app.get('/', (req, res) => res.send('Bot is running'));
app.listen(3000, () => console.log('Web server active'));

// Random movement loop
function randomMovement() {
  const actions = ['forward', 'back', 'left', 'right', 'jump', 'sneak'];
  const action = actions[Math.floor(Math.random() * actions.length)];

  bot.setControlState(action, true);

  setTimeout(() => {
    bot.setControlState(action, false);
  }, Math.random() * 1000 + 500); // Random duration between 0.5s–1.5s
}

// Start movement every few seconds
bot.once('spawn', () => {
  console.log('Bot spawned and ready!');
  setInterval(randomMovement, 3000); // Move every 3 seconds
});
