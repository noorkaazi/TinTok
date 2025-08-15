require('electron-reload')(__dirname, {
  electron: require(`${__dirname}/node_modules/electron`)
});

const { app, BrowserWindow } = require('electron');
const path = require('path');

require('@electron/remote/main').initialize();

function createWindow() {
  const win = new BrowserWindow({
      width: 400,
      height: 480,
      resizable: false,
      frame: false,
      autoHideMenuBar: true,
      menuBarVisible: false,
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false
    }
  });
  require('@electron/remote/main').enable(win.webContents); 

  win.loadFile('index.html');
}

app.whenReady().then(createWindow);


