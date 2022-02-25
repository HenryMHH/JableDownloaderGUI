export declare global {
	interface Window {
		electronAPI: {
			errorMessenger: (cb: Function) => void
			getActorListByPage: (page: number) => void
			infoSetter: (cb: Function) => void
			reloadWindow: () => void
			getVideoListByActorLink: ({ url: string, page: number }) => void
			actorVideoListSetter: (cb: Function) => void
			initDownload: ({ link: string, rootPath: string }) => void
			setupRootFolder: () => void
			returnRootPath: (cb: Function) => void
		}
	}
}
