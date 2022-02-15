import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('electronAPI', {
	fetchMaxPage: () => ipcRenderer.send('fetchMaxPage'),
	getMaxPage: (cb) => ipcRenderer.on('returnMaxPage', cb),
	reloadForFetch: () => ipcRenderer.send('reloadForFetch'),
})
