import axios, { AxiosInstance } from 'axios'
import https from 'https'
import cheerio from 'cheerio'
import { dialog } from 'electron'

export interface DownloadInfo {
	tsFileUrl: string
	folderName: string
	tsFileArray: Array<string>
}

export class DownloadService {
	private Axios: AxiosInstance
	constructor() {
		this.Axios = axios.create({ httpsAgent: new https.Agent({ timeout: 0 }) })
	}
	async initDownload(link: string): Promise<DownloadInfo> {
		let result
		let downloadInfo: DownloadInfo = {
			tsFileUrl: '',
			folderName: '',
			tsFileArray: [],
		}
		let tsFileArray: string[] = []
		try {
			downloadInfo.folderName = link.split('videos/')[1].split('/')[0]
			result = await this.Axios.get(link)
			const $ = cheerio.load(result.data)
			const htmlString = $.html()
			const m3u8_url = htmlString.match(/https:\/\/(?:(?!exclude).)*\.m3u8/g)[0]
			downloadInfo.tsFileUrl = m3u8_url.split('/').slice(0, -1).join('/') + '/'
			const __m3u8_content__ = await this.Axios.get(m3u8_url)
			tsFileArray = __m3u8_content__.data
				.split(',')
				.map((item) => item.split('#')[0].trim())
				.filter((item) => parseInt(item.split('.')[0]) > 0)
			downloadInfo.tsFileArray = tsFileArray
		} catch (error) {
			console.log(error)
		}
		return downloadInfo
	}

	async downloadTsFile(url, folderName) {
		const result = await this.Axios.get(url)
	}
}
