import axios, { AxiosInstance } from 'axios'
import cheerio from 'cheerio'
import https from 'https'
import { dialog } from 'electron'

/**
 * * name 女優名 string
 * * number 影片數 string
 * * href 女優影片清單連結 string
 * * imgSrc 女優頭像 string
 */
export interface ListItem {
	name: string
	number: string
	href: string
	imgSrc: string
}

/**
 * * maxlistPage 最大頁面數 number
 * * actorList 女優清單 Array<{@link ListItem}>
 */
export interface InitInfo {
	maxListPage: number
	actorList: Array<ListItem>
}

/**
 * * indexNO 番號 string
 * * title 片名 string
 * * imgSrc 封面照 string
 * * views 觀看人數 string
 * * favorite 收藏人數 string
 * * link 影片連結 string
 */
export interface ActorVideoItem {
	indexNO: string
	title: string
	imgSrc: string
	views: string
	favorite: string
	link: string
	time: string
}

/**
 * * maxListPage 最大影片頁數 number
 * * videoList 該女優的影片清單 Array<{@link ActorVideoItem}>
 */
export interface ActorVideoInfo {
	maxListPage: number
	videoList: Array<ActorVideoItem>
}

export class GetListService {
	private initialUrl = 'https://jable.tv/models/?mode=async&function=get_block&block_id=list_models_models_list&sort_by=total_videos'
	private maxListPage = 0
	private maxVideoListPage = 0
	private Axios: AxiosInstance
	constructor() {
		this.Axios = axios.create({ httpsAgent: new https.Agent({ timeout: 0 }) })
	}
	async getActorListByPage(page: number): Promise<InitInfo> {
		let result
		const returnObj: InitInfo = {
			maxListPage: 0,
			actorList: [],
		}
		try {
			// Axios 的 instance只能在這邊每次打就建一次，如果建好一個重複使用都會被cloudflare擋住
			// 可能未來有更好的解法
			result = await this.Axios.get(this.initialUrl + `&from=${page}`)
			const $ = cheerio.load(result['data'])
			const linkList = $('div.horizontal-img-box').find('a').toArray()

			// 爬每一個page的女優名單 & 資料
			for (const value of linkList) {
				const tempHref = value.attribs['href']
				returnObj.actorList.push({
					href: tempHref,
					name: $('div.horizontal-img-box').find(`a[href=${tempHref}]`).find('h6.title').text(),
					imgSrc: $(`a[href=${tempHref}]`).find('div.media img').toArray()[0].attribs['src'],
					number: $(`a[href=${tempHref}]`).find('div.detail span').text(),
				})
			}

			// 爬max page
			const list = $('ul.pagination').find('a')
			if (list.length > 0) {
				this.maxListPage = parseInt(list[list.length - 1].attribs.href.split('/')[2])
			}
		} catch (error) {
			console.log(error)
		}

		returnObj.maxListPage = this.maxListPage

		return returnObj
	}

	async getVideoListByActorLink(url: string) {
		let result
		const returnObj: ActorVideoInfo = {
			maxListPage: this.maxVideoListPage,
			videoList: [],
		}
		try {
			result = await this.Axios.get(url + '?sort_by=total_video')
			const $ = cheerio.load(result['data'])

			const videos = $('h6.title > a').toArray()

			videos.forEach((item) => {
				const imgDetail = $('div.img-box').find(`a[href=${item.attribs['href']}]`).first()
				const detail = $('h6.title').find(`a[href=${item.attribs['href']}]`).first()
				returnObj.videoList.push({
					title: detail.text().split(' ')[1],
					indexNO: detail.text().split(' ')[0],
					link: item.attribs['href'],
					views: $('div.detail').find('h6.title').has(`a[href=${item.attribs['href']}]`).next().first().text().split(' ').join('').split('\n')[1],
					favorite: $('div.detail').find('h6.title').has(`a[href=${item.attribs['href']}]`).next().first().text().split(' ').join('').split('\n')[2],
					imgSrc: imgDetail.find('img').attr('data-src'),
					time: imgDetail.find('span.label').text(),
				})
			})

			// 爬女優的影片頁數
			const paginator = $('ul.pagination').find('a')
			if (paginator.length > 0) {
				this.maxVideoListPage = parseInt(paginator[paginator.length - 1].attribs['data-parameters'].split(';from:')[1])
			} else {
				this.maxVideoListPage = 1
			}
		} catch (error) {
			console.log(error)
			this.maxVideoListPage = 0
		}

		returnObj.maxListPage = this.maxVideoListPage
		return returnObj
	}
}
