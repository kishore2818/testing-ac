void import('node:https').then(({ default: https }) => {
  https.get('https://upload.wikimedia.org/wikipedia/commons/d/de/Whatsapp_3D_Icon.png', (res) => {
    console.log('Status 1:', res.statusCode);
  });
  https.get('https://cdn3d.iconscout.com/3d/free/thumb/free-whatsapp-4286134-3561337.png', (res) => {
    console.log('Status 2:', res.statusCode);
  });
});
