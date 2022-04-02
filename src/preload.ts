import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('electronAPI', {
	errorMessenger: (cb) => ipcRenderer.on('error', cb),
	successMessenger: (cb) => ipcRenderer.on('success', cb),
	getPercentage: (cb) => ipcRenderer.on('percentage', cb),
	getActorListByPage: (page: number) => ipcRenderer.send('getActorListByPage', page),
	infoSetter: (cb) => ipcRenderer.on('returnInfo', cb),
	reloadWindow: () => ipcRenderer.send('reloadWindow'),
	actorVideoListSetter: (cb) => ipcRenderer.on('returnVideoList', cb),
	getVideoListByActorLink: (props: { url: string; page: number }) => ipcRenderer.send('getVideoListByActorLink', props),
	beginDownload: (link: string) => ipcRenderer.send('beginDownload', link),
	setupRootFolder: () => ipcRenderer.send('setupRootFolder'),
	returnRootPath: (cb) => ipcRenderer.on('returnRootPath', cb),
})
