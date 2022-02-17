//requerimos axios porque nos permite traer a través de AJAX los archivos JSON con toda la info

const axios = require('axios')


class APIHandler {
    constructor(baseUrl) {
        this.axiosApp = axios.create({
            baseURL: baseUrl
        })
    }

    getCryptos() {
        return this.axiosApp.get('/assets')
    }

    get30DaysBitcoin() {
        return this.axiosApp.get('/assets/bitcoin/history?interval=d1&start=1642287600000&end=1644966000000')
    }

    get30DaysEtherum() {
        return this.axiosApp.get('/assets/ethereum/history?interval=d1&start=1642287600000&end=1644966000000')
    }

    get30DaysEos() {
        return this.axiosApp.get('/assets/eos/history?interval=d1&start=1642287600000&end=1644966000000')
    }

}
module.exports = APIHandler

