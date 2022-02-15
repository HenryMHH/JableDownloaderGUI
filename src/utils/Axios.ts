import axios from 'axios'
import UserAgent from 'user-agents'
import https from 'https'
const userAgent = new UserAgent()

const Axios = axios.create({ httpsAgent: new https.Agent({ keepAlive: true }) })

Axios.interceptors.request.use(
	function (config) {
		// console.log('request config', config.headers)
		return config
	},
	function (error) {
		console.log('request error', error)
		return error
	}
)

export default Axios
