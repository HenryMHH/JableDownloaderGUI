export declare global {
	interface Window {
		electronAPI: {
			errorMessenger: (cb: Function) => void
			successMessenger: (cb: Function) => void
			getActorListByPage: (page: number) => void
			infoSetter: (cb: Function) => void
			reloadWindow: () => void
			getVideoListByActorLink: (props: { url: string; page: number }) => void
			actorVideoListSetter: (cb: Function) => void
			initDownload: ({ link, rootPath }: { link: string; rootPath: string }) => void
			setupRootFolder: () => void
			returnRootPath: (cb: Function) => void
		}
	}
}
