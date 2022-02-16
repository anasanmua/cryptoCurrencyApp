const axios = require('axios')

class APIHandler {
    constructor(baseUrl) {
        this.axiosApp = axios.create({
            baseURL: baseUrl
        })
    }

    renderList() {
    }

    getFullListNews() {
        console.log('estoy pasando por list news')
        return this.axiosApp.get('v2/news/?lang=EN')
    }

    getOneNews() {
    }

    compareTwoCryptos(fst, sec) {
    }
}

module.exports = APIHandler 