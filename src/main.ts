import { app, BrowserWindow, ipcMain, IpcMainEvent, dialog } from 'electron'
import path from 'path'
import fs from 'fs'
import { GetListService, InitInfo } from './service/getListService'
import { DownloadService } from './service/downloadService'
import Axios from './utils/Axios'

const isDev: boolean = process.env.NODE_ENV === 'development' ? true : false

function createWindow() {
	// Create the browser window.
	const mainWindow = new BrowserWindow({
		height: 600,
		webPreferences: {
			preload: path.join(__dirname, 'preload.js'),
		},
		width: 800,
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

async function getActorListByPage(event: IpcMainEvent, page: number) {
	const focusedWindow = BrowserWindow.getFocusedWindow()
	const getListService = new GetListService()
	const result: InitInfo = await getListService.getActorListByPage(page)
	focusedWindow.webContents.send('returnInfo', result)
}

async function getVideoListByActorLink(evnet: IpcMainEvent, { url, page }: { url: string; page: number }) {
	const focusedWindow = BrowserWindow.getFocusedWindow()
	const getListService = new GetListService()
	const result = await getListService.getVideoListByActorLink(url, page)
	focusedWindow.webContents.send('returnVideoList', result)
}

async function initDownload(event: IpcMainEvent, { link, rootPath }: { link: string; rootPath: string }) {
	const focusedWindow = BrowserWindow.getFocusedWindow()
	const downloadService = new DownloadService()
	const downloadInfo = await downloadService.initDownload(link)
	if (downloadInfo.tsFileArray.length > 0) {
		const dir = rootPath + '/' + downloadInfo.folderName
		if (!fs.existsSync(dir)) {
			fs.mkdirSync(dir)
		} else {
			focusedWindow.webContents.send('error', '資料夾已存在，下載程序中斷')
			return
		}
		for (let i = 0; i < downloadInfo.tsFileArray.length; i++) {
			const result = await Axios.get(downloadInfo.tsFileUrl + downloadInfo.tsFileArray[i])
			fs.writeFile(dir + '/' + downloadInfo.tsFileArray[i], result.data, function (err) {
				if (err) {
					focusedWindow.webContents.send('error', err)
					return
				}
			})
		}
	} else {
		focusedWindow.webContents.send('error', '未獲取下載連結')
	}
}

async function setupRootFolder() {
	const focusedWindow = BrowserWindow.getFocusedWindow()
	const getFolderPath = await dialog.showOpenDialog({
		properties: ['openDirectory'],
	})

	if (!getFolderPath.canceled) {
		focusedWindow.webContents.send('returnRootPath', getFolderPath.filePaths[0])
	}
}

function reloadForFetch() {
	const focusedWindow = BrowserWindow.getFocusedWindow()
	focusedWindow.reload()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
	ipcMain.on('getActorListByPage', getActorListByPage)
	// ipcMain.on('fetchActorListByPage', getListByPage)
	ipcMain.on('reloadWindow', reloadForFetch)
	ipcMain.on('getVideoListByActorLink', getVideoListByActorLink)
	ipcMain.on('initDownload', initDownload)
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
