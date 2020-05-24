const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

let mainWindow = null;

app.on("window-all-closed", function () {
  // if (process.platform !== "darwin") {
  //   app.quit();
  // }
  app.quit();
});

app.on("ready", function () {
  // ブラウザ(Chromium)の起動, 初期画面のロード
  mainWindow = new BrowserWindow({
    width: 600,
    height: 300,
    // frame: false, //windows フレームなし
    // opacity: 0.7 // window 背景透過率
  });

  mainWindow.loadURL("file://" + __dirname + "/src/index.html");

  mainWindow.on("closed", function () {
    mainWindow = null;
  });

  mainWindow.setAlwaysOnTop(true); // 常にトップ
});
