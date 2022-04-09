import { BrowserWindow, dialog, IpcMainEvent } from 'electron'
import { DownloadService } from '../service/downloadService'
import { BeginDownloadInfo } from '../types/types'
import fs from 'fs'
import { GetListService, InitInfo } from '../service/getListService'

/**
 *
 * @param event
 * @param info
 * @returns void
 */
export async function beginDownload(event: IpcMainEvent, info: BeginDownloadInfo): Promise<void> {
	const { link, rootPath } = info
	const downloadService = new DownloadService()
	const focusedWindow = BrowserWindow.getFocusedWindow()
	const downloadInfo = await downloadService.initDownloadInfo(link)
	const { tsFileArray, folderName, keyURIContent, _IV } = downloadInfo

	if (tsFileArray.length === 0) {
		focusedWindow.webContents.send('error', '未獲取下載連結')
		return
	}

	const dir = rootPath + '/' + folderName
	const mp4Name = folderName + '.mp4'
	const mp4FileNameArray = tsFileArray.map((item) => item.replace('ts', 'mp4'))
	const mp4FullPath = dir + '/' + mp4Name

	if (!fs.existsSync(dir)) {
		fs.mkdirSync(dir)
		focusedWindow.webContents.send('success', `${mp4Name} 下載初始化!`)
	} else {
		focusedWindow.webContents.send('error', '資料夾已存在，下載程序中斷')
		return
	}

	try {
		for (let i = 0; i < mp4FileNameArray.length; i++) {
			const singleMp4FullPath = dir + '/' + mp4FileNameArray[i]
			const fullDownloadUrl = downloadInfo.tsFileUrl + tsFileArray[i]

			function errorCallback(err) {
				console.log('err')
				focusedWindow.webContents.send('error', err)
			}
			await downloadService.downloadTsFile(singleMp4FullPath, fullDownloadUrl, _IV, keyURIContent, errorCallback)
			focusedWindow.webContents.send('percentage', `${i} / ${mp4FileNameArray.length}`)
		}
		downloadService.combineTsFile(dir, mp4FullPath, mp4FileNameArray)
		downloadService.deleteTsFile(dir, mp4FileNameArray)

		focusedWindow.webContents.send('success', `${mp4Name} 下載完成!`)
	} catch (error) {
		focusedWindow.webContents.send('error', error)
	}
}

export async function getActorListByPage(event: IpcMainEvent, page: number) {
	const focusedWindow = BrowserWindow.getFocusedWindow()
	const getListService = new GetListService()
	const result: InitInfo = await getListService.getActorListByPage(page)
	focusedWindow.webContents.send('returnInfo', result)
}

export async function getVideoListByActorLink(evnet: IpcMainEvent, { url, page }: { url: string; page: number }) {
	const focusedWindow = BrowserWindow.getFocusedWindow()
	const getListService = new GetListService()
	const result = await getListService.getVideoListByActorLink(url, page)
	console.log('fetchList')
	focusedWindow.webContents.send('returnVideoList', result)
}

export async function setupRootFolder() {
	const focusedWindow = BrowserWindow.getFocusedWindow()
	const getFolderPath = await dialog.showOpenDialog({
		properties: ['openDirectory'],
	})

	if (!getFolderPath.canceled) {
		focusedWindow.webContents.send('returnRootPath', getFolderPath.filePaths[0])
	}
}

export function reloadForFetch() {
	const focusedWindow = BrowserWindow.getFocusedWindow()
	focusedWindow.reload()
}

export function minimizeWindow() {
	const focusedWindow = BrowserWindow.getFocusedWindow()
	focusedWindow.minimize()
}

export function closeWindow() {
	const focusedWindow = BrowserWindow.getFocusedWindow()
	focusedWindow.close()
}
