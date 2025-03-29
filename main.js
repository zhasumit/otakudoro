const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
    let win = new BrowserWindow({
        width: 1200,
        height: 800,
        webPreferences: {
            nodeIntegration: true,
        }
    });

    win.loadFile(path.join(__dirname, 'index.html')); // Load your HTML file
}

app.whenReady().then(createWindow);
