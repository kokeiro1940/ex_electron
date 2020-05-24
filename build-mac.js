const builder = require('electron-builder');

builder.build({
  config: {
    appId: 'audio_app',
    mac:{
      'target': 'zip',
    }
  }
});
