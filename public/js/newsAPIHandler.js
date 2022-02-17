
class APIHandler {
    constructor(baseUrl) {
        this.axiosApp = axios.create({
            baseURL: baseUrl
        })
    }

    getFullListNews() {
        return this.axiosApp.get(`v2/news/?lang=EN`)
    }

    getOneCryptoPrice(coinName) {
        return this.axiosApp.get(`price?fsym=${coinName}&tsyms=USD,EUR`)
    }

    getNews(start, limit) {
        limit = start + 10
        return this.axiosApp.get(`v2/news/?lang=EN`).then(resp => resp.data.Data.slice(start, limit))
    }

}
