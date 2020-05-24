const builder = require('electron-builder');

builder.build({
  // platform: "win",
  config: {
    appId: "audio_app",
    win: {
      target: {
        target: "zip",
        arch: ["x64", "ia32"],
      },
    },
  },
});
