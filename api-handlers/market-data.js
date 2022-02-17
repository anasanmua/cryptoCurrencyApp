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


}


module.exports = APIHandler

