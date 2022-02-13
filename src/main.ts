import { app, BrowserWindow, ipcMain } from 'electron'
import * as path from 'path'
import fs from 'fs'
import axios from 'axios'
import cheerio from 'cheerio'
import { GetListService } from './service/getListService'

function createWindow() {
	// Create the browser window.
	const mainWindow = new BrowserWindow({
		height: 600,
		webPreferences: {
			preload: path.join(__dirname, 'preload.js'),
		},
		width: 800,
	})
	mainWindow.loadFile(path.join(__dirname, '../index.html'))
	mainWindow.webContents.openDevTools()
	fs.watch('./lib', { recursive: true }, () => {
		mainWindow.reload()
	})
}

function handleSetTitle(event, title) {
	const webContents = event.sender
	const win = BrowserWindow.fromWebContents(webContents)
	// console.log(title)
	win.setTitle(title)
}

async function getActorList() {
	const focusedWindow = BrowserWindow.getFocusedWindow()
	const getListService = new GetListService()
	const reuslt = await getListService.getList(1)

	focusedWindow.webContents.send('TT', reuslt)
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
	ipcMain.on('test', handleSetTitle)
	ipcMain.on('fetchData', getActorList)
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
