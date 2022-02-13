import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('electronAPI', {
	setTitle: (title) => ipcRenderer.send('test', title),
	fetchData: (cb) => ipcRenderer.send('fetchData', cb),
	cool: (cb) => ipcRenderer.on('TT', cb),
})
