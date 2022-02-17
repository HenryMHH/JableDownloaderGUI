import axios from 'axios'
import https from 'https'

const Axios = axios.create({ httpsAgent: new https.Agent({ timeout: 0 }) })

export default Axios
