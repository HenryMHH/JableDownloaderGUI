export declare global {
	interface Window {
		electronAPI: {
			getActorListByPage: (page: number) => void
			infoSetter: (cb: Function) => void
			reloadWindow: () => void
			getVideoListByActorLink: (url: string) => void
			actorVideoListSetter: (cb: Function) => void
		}
	}
}
