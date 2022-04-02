import axios, { AxiosInstance } from 'axios'
import https from 'https'
import cheerio from 'cheerio'
import { dialog } from 'electron'
import CryptoJS, { AES } from 'crypto-js'
import crypto from 'crypto'

export interface DownloadInfo {
	tsFileUrl: string
	folderName: string
	tsFileArray: Array<string>
	_URI?: string
	_IV?: string
	test?: string
	URIContent: any
}

export class DownloadService {
	private Axios: AxiosInstance
	public _URI = ''
	public _IV = ''
	constructor() {
		this.Axios = axios.create({ httpsAgent: new https.Agent({ timeout: 0 }) })
	}
	async initDownload(link: string): Promise<DownloadInfo> {
		let result
		let downloadInfo: DownloadInfo = {
			tsFileUrl: '',
			folderName: '',
			tsFileArray: [],
			test: '',
			URIContent: '',
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
			const _URI = __m3u8_content__.data
				.split(',')
				.filter((item) => item.includes('URI'))[0]
				.split('=')[1]
				.replace(/\"/g, '')
			const _IV = __m3u8_content__.data
				.split(',')
				.filter((item) => item.includes('IV'))[0]
				.split('#')[0]
				.split('=')[1]
				.replace('0x', '')
				.slice(0, 16)
			this._URI = _URI
			this._IV = _IV
			let fullURI = m3u8_url.split('/').slice(0, -1).join('/') + '/' + _URI
			const _URIContent = await this.Axios.get(fullURI, { responseType: 'arraybuffer' })
			downloadInfo.URIContent = _URIContent.data
			downloadInfo._IV = _IV
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

	decrypt(data: Uint8Array, IV, key: Uint8Array) {
		const decipher = crypto.createDecipheriv('aes-128-cbc', key, Buffer.from(IV))
		let decrypted = decipher.update(data)
		decrypted = Buffer.concat([decrypted, decipher.final()])
		return decrypted
	}
}
