export declare global {
	interface Window {
		electronAPI: {
			fetchMaxPage: () => void
			getMaxPage: (cb: Function) => void
			reloadForFetch: () => void
		}
	}
}
