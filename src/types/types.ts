export enum FetchStatus {
	success = 'success',
	error = 'error',
	pending = 'pending',
}

/**
 * @param tsFileUrl string 下載ts檔案的url
 * @param folderName string 番號名
 * @param tsFileArray string[] 需要下載的ts file name
 * @param _IV string aes-cbc 解密用的初始向量
 * @param keyURIContent Buffer aes-cbc解密用的key，type是arrayBuffer
 */
export interface InitDownloadInfo {
	tsFileUrl: string
	folderName: string
	tsFileArray: Array<string>
	_IV: string
	keyURIContent: Buffer
}

export interface M3U8Info {
	status: FetchStatus.success | FetchStatus.error | FetchStatus.pending
	keyURIName: string
	_IV: string
	tsFileArray: string[]
}

export interface BeginDownloadInfo {
	link: string
	rootPath: string
}
