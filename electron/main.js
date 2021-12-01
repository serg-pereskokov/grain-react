const  { app, BrowserWindow } = require('electron')
const isDev = require('electron-is-dev')
const path = require('path')

let mainWindow = null

const createWindow = () => {
    mainWindow = new BrowserWindow({
        width: 1000,
        height: 800,
        show: false
    })

    const startURL = isDev 
                    ? 'http://localhost:3000'
                    : `file://${path.join(__dirname, '../client/build/index.html')}`
    
    mainWindow.loadURL(startURL)

    mainWindow.once('ready-to-show', () => mainWindow.show())

    mainWindow.on('closed', () => mainWindow = null)
}

app.whenReady().then(createWindow)
