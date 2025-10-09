function createBot() {
  let reconnecting = false;

  const bot = mineflayer.createBot({
    host: 'XDserverOP.aternos.me',
    port: 48903,
    username: 'MovementBot',
    version: false
  });

  function randomMovement() {
    const actions = ['forward', 'back', 'left', 'right', 'jump', 'sneak'];
    const action = actions[Math.floor(Math.random() * actions.length)];

    bot.setControlState(action, true);
    setTimeout(() => {
      bot.setControlState(action, false);
    }, Math.random() * 1000 + 500);
  }

  bot.once('spawn', () => {
    console.log('✅ Bot spawned and ready!');
    setInterval(randomMovement, 3000);
  });

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
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Web server active on port ${PORT}`));
