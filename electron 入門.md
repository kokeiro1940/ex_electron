---
theme : "night"
transition : "default"
---

# Electron
- javascript で書いた Web アプリ を デスクトップアプリ にできる js フレームワーク
  - Node x Chromium
- 代表例
  - VScode, Slack, Atom ... https://www.electronjs.org/apps

---

## Electron 環境構築
- node install など
```
❯❯❯ brew install nodebrew
# export PATH=$HOME/.nodebrew/current/bin:$PATH のパスを通す

❯❯❯ nodebrew install v12.16.3
# warning が出て install できないとき https://qiita.com/yn01/items/d1fa10dbe4850f7cd693

❯❯❯ nodebrew use v12.16.3

❯❯❯ node -v
v12.16.3
```

---

- yarn install
  - js のパッケージマネージャー、これでelectron などの plugin を install・管理 します
```
❯❯❯ brew install yarn

❯❯❯ yarn -v
1.22.4 (2020-05-24 時点)
```

---

## とりあえず js で適当なアプリを作る
- てきとうなサンプル: https://github.com/kokeiro1940/audio_player
  - 爆音なので注意してください

---

## Electron 導入
- clone してきた `./audio_player` を `./src` にリネーム(ハンズオンの都合でこうしています)
- `src` がある dir で以下を実行

```
❯❯❯ ls
src

❯❯❯ yarn init
(Enter 連打)

❯❯❯ yarn add electron

❯❯❯ ls
node_modules    package.json    src    yarn.lock
```

---

## 設定ファイル記述
- electron の設定を記述するファイル作成 (./electron.js)
```
❯❯❯ ls
node_modules    package.json    src    yarn.lock

❯❯❯ vim ./electron.js
```

---

  - ./electron.js
```
const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

let mainWindow = null;

app.on('window-all-closed', function() {
  // if (process.platform !== "darwin") {
  //   app.quit();
  // }
  app.quit();
});

app.on('ready', function() {

  // ブラウザ(Chromium)の起動, 初期画面のロード
  mainWindow = new BrowserWindow({
    width: 600,
    height: 300
    // frame: false, //windows フレームなし
    // opacity: 0.7 // window 背景透過率
  });

  mainWindow.loadURL('file://' + __dirname + '/src/index.html');

  mainWindow.on('closed', function() {
    mainWindow = null;
  });

  mainWindow.setAlwaysOnTop(true); // 常にトップ
});
```

---

## package.json 編集
- ./electron.js の読み込み設定
- ディレクトリ指定
```
❯❯❯ ls
electron.js    node_modules   package.json   src            yarn-error.log yarn.lock

❯❯❯ vim package.json
```

---

```
{
  "name": "js_audio_player",
  "version": "1.0.0",
  "main": "electron.js", ☆
  "license": "MIT",
  "dependencies": {
    "electron": "^9.0.0"
  }, ☆
  "scripts": { ☆
    "electron": "electron ." ☆
  } ☆
}
```

---

## Electron 起動
```
❯❯❯ yarn electron ./src
```

---

## パッケージング electron-builder
- electron-builder のインストール
```
❯❯❯ yarn add electron-builder
```

---

- package.json の編集
```
{
  "name": "ex_electron",
  "version": "1.0.0",
  "main": "electron.js",
  "license": "MIT",
  "dependencies": {
    ☆
    ☆
  },
  "scripts": {
    "electron": "electron ."
  },
  "devDependencies": {
    "electron": "^9.0.0", ☆
    "electron-builder": "^22.6.1" ☆
  }
}
```

---

### mac
- build 用スクリプト作成
```
❯❯❯ vim build-mac.js
```
```
const builder = require('electron-builder');

builder.build({
    config: {
        'appId': 'audio_app',
        'mac':{
            'target': 'zip',
        }
    }
});
```

---

- build
```
❯❯❯ node build-mac
# ちょっと時間がかかる
```

- ./dist 配下に作成完了

---

### win うまくいかない、 winでないとbuildできない?
- build 用スクリプト作成
```
❯❯❯ vim build-win.js
```
```
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
```

---

- build
```
❯❯❯ node build-win.js
# ちょっと時間がかかる
```

---

- ./dist 配下に作成完了

## パッケージング electron-packager
- build はできたけど、パッケージを実行できなかった
```
❯❯❯ yarn add  electron-packager

# mac向け
❯❯❯ yarn electron-packager ./src MusicPlayer --platform=darwin --arch=x64 --overwrite

# windows向け
❯❯❯ yarn electron-packager ./src MusicPlayer --platform=win32 --arch=x64 --overwrite
```

---
