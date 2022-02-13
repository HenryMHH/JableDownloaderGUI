import axios from 'axios'
import cheerio from 'cheerio'

interface ListItem {
	name: string
	number: string
	href: string
}

export class GetListService {
	private initialUrl = 'https://jable.tv/models/?mode=async&function=get_block&block_id=list_models_models_list&sort_by=total_videos'
	private maximumPage = 5
	public actorList: Array<ListItem> = []

	async getMaximumPage() {
		const result = await axios(this.initialUrl)
		const $ = cheerio.load(result.data)
		const list = $('ul.pagination').find('a')
		if (list.length > 0) {
			this.maximumPage = parseInt(list[list.length - 1].attribs.href.split('/')[2])
		} else {
			this.maximumPage = 0
		}
	}

	sleep() {
		return new Promise((res, rej) => {
			setTimeout(function () {
				res('')
			}, 5000)
		})
	}

	async getList(page: number) {
		// await this.getMaximumPage();
		const a = []
		if (this.maximumPage > 0) {
			for (let i = 2; i <= this.maximumPage; i++) {
				console.log(this.initialUrl + `&from=${i}&_=${Date.now()}`)
				const result = await axios(this.initialUrl + `&from=${i}&_=${Date.now()}`)
				const $ = cheerio.load(result.data)
				$('div.horizotal-img-box')
					.find('a')
					.each((i, el) => {
						a.push(el)
					})
				await this.sleep()
			}
		}
		return a
	}
}
