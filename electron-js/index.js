const {
    app, 
    BrowserWindow
} = require('electron');
require('dotenv').config()
let mainWindow;

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        // width: process.env.WIDTH,
        // height:process.env.HEIGHT,
        // fullscreen: process.env.FULLSCREEN,
        width: 900,
        height:700,
        fullscreen: false,
        resizable: false,
        frame: true,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            devTools: true
        }
    });

    mainWindow.loadURL(`file://${__dirname}/index.html`);
    let dir = __dirname.replace("\\resources", "").replace("\\app.asar", "");
    mainWindow.setIcon(`${dir}\\`+process.env.FILE_ICON);

    // shell.openItem(app.getAppPath() + '\\local\\print.bat');
})
