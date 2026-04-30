void import('node:https').then(({ default: https }) => {
  https.get('https://upload.wikimedia.org/wikipedia/commons/5/5e/WhatsApp_icon.png', (res) => {
    console.log('Status:', res.statusCode);
  });
});
