import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('electronAPI', {
	getActorListByPage: (page: number) => ipcRenderer.send('getActorListByPage', page),
	infoSetter: (cb) => ipcRenderer.on('returnInfo', cb),
	reloadWindow: () => ipcRenderer.send('reloadWindow'),
	actorVideoListSetter: (cb) => ipcRenderer.on('returnVideoList', cb),
	getVideoListByActorLink: (url: string) => ipcRenderer.send('getVideoListByActorLink', url),
})
