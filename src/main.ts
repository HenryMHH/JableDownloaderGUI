import { app, BrowserWindow, ipcMain } from 'electron'
import path from 'path'
import fs from 'fs'
import { beginDownload, getActorListByPage, getVideoListByActorLink, reloadForFetch, setupRootFolder } from './utils/processes'

const isDev: boolean = process.env.NODE_ENV === 'development' ? true : false

function createWindow() {
	// Create the browser window.
	const mainWindow = new BrowserWindow({
		height: 600,
		webPreferences: {
			preload: path.join(__dirname, 'preload.js'),
		},
		width: 900,
		autoHideMenuBar: true,
		resizable: false,
		titleBarStyle: 'hidden',
	})

	mainWindow.loadFile(path.join(__dirname, '../index.html'))

	if (isDev) {
		mainWindow.webContents.openDevTools({ mode: 'detach' })
		fs.watch('./dist', { recursive: true }, () => {
			mainWindow.reload()
		})
	}
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
	ipcMain.on('getActorListByPage', getActorListByPage)
	ipcMain.on('reloadWindow', reloadForFetch)
	ipcMain.on('getVideoListByActorLink', getVideoListByActorLink)
	ipcMain.on('beginDownload', beginDownload)
	ipcMain.on('setupRootFolder', setupRootFolder)
	createWindow()

	app.on('activate', function () {
		// On macOS it's common to re-create a window in the app when the
		// dock icon is clicked and there are no other windows open.
		if (BrowserWindow.getAllWindows().length === 0) createWindow()
	})
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit()
	}
})

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
