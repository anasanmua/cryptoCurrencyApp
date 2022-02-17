const axios = require('axios')

class APIHandler {
    constructor(baseUrl) {
        this.axiosApp = axios.create({
            baseURL: baseUrl
        })
    }

    getFullListNews() {
        console.log('estoy pasando por list news')
        return this.axiosApp.get(`v2/news/?lang=EN&api_key={${process.env.APIKEY}}`)
    }

    getOneCryptoPrice(coinName) {
        return this.axiosApp.get(`price?fsym=${coinName}&tsyms=USD,EUR&api_key={${process.env.APIKEY}}`)
    }
}

module.exports = APIHandler 