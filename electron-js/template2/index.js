const {
    app, 
    BrowserWindow
} = require('electron');
require('dotenv').config()
let mainWindow;
// Variável iniciais
process.env.GIT_UPDATE = "true";

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        // width: process.env.WIDTH,
        // height:process.env.HEIGHT,
        // fullscreen: process.env.FULLSCREEN,
        width: 1000,
        height:720,
        fullscreen: false,
        resizable: false,
        frame: false,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            devTools: false
        }
    });

    mainWindow.loadURL(`file://${__dirname}/index.html`);
    let dir = __dirname.replace("\\resources", "").replace("\\app.asar", "").replace("\\template2", "").replace("\\template1", "");
    mainWindow.setIcon(`${dir}\\`+process.env.FILE_ICON);

    // shell.openItem(app.getAppPath() + '\\local\\print.bat');
})

