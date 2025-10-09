const mineflayer = require('mineflayer');
const express = require('express');

// 🌐 Express server to keep Render alive
const app = express();
const PORT = process.env.PORT || 3000;
app.get('/', (req, res) => res.send('Bot is running'));
app.listen(PORT, () => console.log(`🌍 Web server active on port ${PORT}`));

// 🔁 Bot creation function with reconnect guard
function createBot() {
  let reconnecting = false;

  const bot = mineflayer.createBot({
    host: 'XDserverOP.aternos.me', // ✅ Your Aternos server IP
    port: 48903,                   // ✅ Your Aternos server port
    username: 'MovementBot',       // ✅ Bot name
    version: false                 // Auto-detect Minecraft version
  });

  // 🕹️ Anti-AFK random movement
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
    bot.chat('Hello world! I am online 😎');
    setInterval(randomMovement, 3000); // Move every 3 seconds
  });

  // 🔌 Reconnect logic
  function reconnect() {
    if (reconnecting) return;
    reconnecting = true;
    console.log('🔄 Reconnecting in 5 seconds...');
    setTimeout(() => {
      reconnecting = false;
      createBot();
    }, 5000);
  }

  bot.on('end', reconnect);
  bot.on('error', (err) => {
    console.log('❌ Bot error:', err.message);
    reconnect();
  });
}

// 🚀 Start the bot safely
try {
  createBot();
} catch (err) {
  console.error("❌ Bot crashed during startup:", err);
}
