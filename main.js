const { app, BrowserWindow ,Menu, dialog} = require('electron')
const { autoUpdater} = require('electron-updater')
const isDev = require('electron-is-dev')
const path = require('path')
function createWindow() {
    // Menu.setApplicationMenu(null);  
    const win = new BrowserWindow({
        // fullscreen: true,
        width: 1920,
        height: 1080,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    })
    const urlLocation = isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, './build/index.html')}`
    win.loadURL(urlLocation)
}
app.on('ready',() => {
    if(isDev){
		autoUpdater.updateConfigPath = path.join(__dirname, 'dev-app-update.yml')
	}
    // 检查更新
    autoUpdater.autoDownload = false;
    autoUpdater.checkForUpdatesAndNotify();
    autoUpdater.on('error', (error) => {
        console.log("error:",error)
        dialog.showErrorBox('Error:',error==null?'unkown':error.message)
    })
    autoUpdater.on('checking-for-update',()=>{
        console.log("checking-for-update...")
    })
    autoUpdater.on('update-available',()=>{
        dialog.showMessageBox({
            type:'info',
            title:'应用有新的版本',
            message:'发现新版本，是否现在更新？',
            buttons:['是','否']
        },(buttonIndex)=>{
            if(buttonIndex===0){
                autoUpdater.downloadUpdate()
            }
        })
    })
    autoUpdater.on('update-not-available',()=>{
        dialog.showMessageBox({
            title:'没有新的版本',
            message:'当前已经是最新版本'
        })
    })
    autoUpdater.on('download-progress',(progressObj)=>{
        console.log("progressObj:",progressObj)
    })
    autoUpdater.on('update-downloaded',()=>{
        dialog.showMessageBox({
            title:'安装更新',
            message:'更新下载完毕，应用将重启并进行安装'
        },()=>{
            setImmediate(()=>{autoUpdater.quitAndInstall()})
        })
    })

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