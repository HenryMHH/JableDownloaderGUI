import axios, { AxiosInstance } from 'axios'
import https from 'https'
import cheerio from 'cheerio'
import crypto from 'crypto'
import { InitDownloadInfo, FetchStatus, M3U8Info } from '../types/types'
import fs from 'fs'
export class DownloadService {
	private Axios: AxiosInstance
	constructor() {
		this.Axios = axios.create({ httpsAgent: new https.Agent({ timeout: 0 }) })
	}
	/**
	 * 初始化下載所有ts file所需要的資訊，包括IV / KEY的內容
	 * @param link
	 * @returns
	 */
	async initDownloadInfo(link: string): Promise<InitDownloadInfo> {
		const downloadInfo: InitDownloadInfo = {
			tsFileUrl: '',
			folderName: '',
			tsFileArray: [],
			keyURIContent: Buffer.from(''),
			_IV: '',
		}
		try {
			const result = await this.Axios.get(link)
			const $ = cheerio.load(result.data)
			const htmlString = $.html()
			const m3u8_url = htmlString.match(/https:\/\/(?:(?!exclude).)*\.m3u8/g)[0]
			const m3u8info = await this.fetchM3U8Content(m3u8_url)
			const fullUriUrl = m3u8_url.split('/').slice(0, -1).join('/') + '/' + m3u8info.keyURIName
			const _keyURIContent = await this.fetchKeyURIContent(fullUriUrl)

			if (!_keyURIContent || m3u8info.status !== 'success') {
				throw 'error'
			}

			downloadInfo.tsFileUrl = m3u8_url.split('/').slice(0, -1).join('/') + '/'
			downloadInfo.folderName = link.split('videos/')[1].split('/')[0]
			downloadInfo.keyURIContent = _keyURIContent
			downloadInfo._IV = m3u8info._IV
			downloadInfo.tsFileArray = m3u8info.tsFileArray
		} catch (error) {
			console.log(error)
		}
		return downloadInfo
	}
	/**
	 * 下載m3u8檔案
	 * 檔案中包含IV / KEY的檔案 / 所有ts片段的檔案名稱
	 * @param url
	 * @returns
	 */
	async fetchM3U8Content(url: string): Promise<M3U8Info> {
		const m3u8Info = {
			status: FetchStatus.pending,
			keyURIName: '',
			_IV: '',
			tsFileArray: [],
		}
		try {
			const result = await this.Axios.get(url)
			m3u8Info.keyURIName = result.data
				.split(',')
				.filter((item) => item.includes('URI'))[0]
				.split('=')[1]
				.replace(/\"/g, '')

			m3u8Info._IV = result.data
				.split(',')
				.filter((item) => item.includes('IV'))[0]
				.split('#')[0]
				.split('=')[1]
				.replace('0x', '')
				.slice(0, 16)

			m3u8Info.tsFileArray = result.data
				.split(',')
				.map((item) => item.split('#')[0].trim())
				.filter((item) => parseInt(item.split('.')[0]) > 0)

			m3u8Info.status = FetchStatus.success
		} catch (error) {
			m3u8Info.status = FetchStatus.error
		}
		return m3u8Info
	}
	/**
	 * 下載key的內容，用於aes-cbc解密
	 * @param url
	 * @returns Buffer
	 */
	async fetchKeyURIContent(url: string): Promise<Buffer> {
		let keyURIContent = Buffer.from('')
		try {
			const result = await this.Axios.get(url, { responseType: 'arraybuffer' })
			keyURIContent = result.data
		} catch (error) {
			console.log(error)
		}
		return keyURIContent
	}

	/**
	 * 下載TS檔案，如果該檔案已經存在，則略過下載
	 * @param singleMp4FullPath
	 * @param fullDownloadUrl
	 * @param IV
	 * @param keyContent
	 * @param errorCb
	 */
	async downloadTsFile(singleMp4FullPath: string, fullDownloadUrl: string, IV: string, keyContent: Buffer, errorCb) {
		if (!fs.existsSync(singleMp4FullPath)) {
			try {
				const result = await this.Axios.get(fullDownloadUrl, { responseType: 'arraybuffer' })
				fs.writeFile(singleMp4FullPath, this.decrypt(result.data, IV, keyContent), function (err) {
					if (err) {
						errorCb(err)
						return
					}
				})
			} catch (err) {
				errorCb(err)
			}
		}
	}
	/**
	 * 把所有零散的mp4檔合併
	 * @param dir
	 * @param mp4FullPath
	 * @param mp4FileNameArray
	 */
	combineTsFile(dir: string, mp4FullPath: string, mp4FileNameArray: string[]) {
		let writer = fs.createWriteStream(mp4FullPath)
		for (let i = 0; i < mp4FileNameArray.length; i++) {
			let fullPath = dir + '/' + mp4FileNameArray[i]
			if (fs.existsSync(fullPath)) {
				const content = fs.readFileSync(fullPath)
				writer.write(content)
			} else {
				console.log(fullPath)
			}
		}
		writer.end()
	}
	/**
	 * 刪除所有零散的mp4檔
	 * @param dir
	 * @param mp4FileNameArray
	 */
	deleteTsFile(dir: string, mp4FileNameArray: string[]) {
		for (let i = 0; i < mp4FileNameArray.length; i++) {
			let fullPath = dir + '/' + mp4FileNameArray[i]
			fs.unlink(fullPath, (errMsg) => {
				if (errMsg) {
					console.log(errMsg)
				}
			})
		}
	}

	/**
	 * aes-cbc-128解密，key 跟 IV 都是16 bytes Buffer
	 * @param data
	 * @param IV
	 * @param key
	 * @returns
	 */
	decrypt(data: Uint8Array, IV: string, key: Uint8Array) {
		const decipher = crypto.createDecipheriv('aes-128-cbc', key, Buffer.from(IV))
		let decrypted = decipher.update(data)
		decrypted = Buffer.concat([decrypted, decipher.final()])
		return decrypted
	}
	/**
	 * 轉換當前下載數量比 為 百分比數字(string)
	 * @param currentIndex
	 * @param totalFileNumber
	 * @returns
	 */
	formatPercentage(currentIndex: number, totalFileNumber: number): string {
		let ratio = (currentIndex / totalFileNumber) * 100
		return Number.parseFloat(ratio.toString()).toFixed(1)
	}
}
