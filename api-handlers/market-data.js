//requerimos axios porque nos permite traer a través de AJAX los archivos JSON con toda la info

const axios = require('axios')


class APIHandler {
    constructor(baseUrl) {
        this.axiosApp = axios.create({
            baseURL: baseUrl
        })
    }

    getCryptos() {
        console.log('getting cryptos')
        return this.axiosApp.get('/assets')
    }

    get30DaysBitcoin() {
        console.log('estoy pasando el market data de bitcoin')
        return this.axiosApp.get('/assets/bitcoin/history?interval=d1&start=1642287600000&end=1644966000000')
    }

    get30DaysEtherum() {
        console.log('estoy pasando el market data de etherum')
        return this.axiosApp.get('/assets/ethereum/history?interval=d1&start=1642287600000&end=1644966000000')
    }

    get30DaysEos() {
        console.log('estoy pasando el market data de eos')
        return this.axiosApp.get('/assets/eos/history?interval=d1&start=1642287600000&end=1644966000000')
    }

}
module.exports = APIHandler

