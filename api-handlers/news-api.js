const axios = require('axios')

class APIHandler {
    constructor(baseUrl) {
        this.axiosApp = axios.create({
            baseURL: baseUrl
        })
    }

    getFullListNews() {
        return this.axiosApp.get(`v2/news/?lang=EN&api_key={${process.env.APIKEY}}`)
    }

    getOneCryptoPrice(coinName) {
        return this.axiosApp.get(`price?fsym=${coinName}&tsyms=USD,EUR&api_key={${process.env.APIKEY}}`)
    }

    getNews(start, limit) {
        return this.axiosApp.get(`v2/news/?lang=EN&api_key={${process.env.APIKEY}}`).slice(start, limit)
    }

}

module.exports = APIHandler 