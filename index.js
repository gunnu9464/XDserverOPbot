const mineflayer = require('mineflayer');
const express = require('express');

// 🌐 Express server to keep Render alive
const app = express();
app.get('/', (req, res) => res.send('Bot is running'));
app.listen(3000, () => console.log('Web server active on port 3000'));

// 🔁 Bot creation function
function createBot() {
  const bot = mineflayer.createBot({
    host: 'XDserverOP.aternos.me', // Replace with your server IP
    port: 48903,                   // Replace with your server port
    username: 'MovementBot',       // Bot name
    version: false                 // Auto-detect version
  });

  // 🕹️ Random movement loop
  function randomMovement() {
    const actions = ['forward', 'back', 'left', 'right', 'jump', 'sneak'];
    const action = actions[Math.floor(Math.random() * actions.length)];

    bot.setControlState(action, true);
    setTimeout(() => {
      bot.setControlState(action, false);
    }, Math.random() * 1000 + 500); // 0.5s–1.5s
  }

  bot.once('spawn', () => {
    console.log('✅ Bot spawned and ready!');
    setInterval(randomMovement, 3000); // Move every 3 seconds
  });

  // 🔌 Auto-reconnect on disconnect
  bot.on('end', () => {
    console.log('⚠️ Bot disconnected. Reconnecting in 5 seconds...');
    setTimeout(createBot, 5000);
  });

  bot.on('error', (err) => {
    console.log('❌ Bot error:', err.message);
  });
}

// 🚀 Start the bot
createBot();
