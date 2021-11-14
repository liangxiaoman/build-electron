const { app, BrowserWindow ,Menu} = require('electron')
const isDev = require('electron-is-dev')
const path = require('path')
function createWindow() {
    Menu.setApplicationMenu(null);  
    const win = new BrowserWindow({
        fullscreen: true,
        width: 1920,
        height: 1080,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    })
    const urlLocation = isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, './build/index.html')}`
    win.loadURL(urlLocation)
}
app.whenReady().then(() => {
    createWindow()
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })
})
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})