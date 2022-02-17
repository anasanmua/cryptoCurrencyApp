const router = require("express").Router()

//Requerir middleware para chekear que el User está logeado
const { isLoggedIn } = require('../middleware/route-guard')

//Requerir modelo(s)
const User = require("../models/User.model")

//Requerir bcrypt para encriptar password
const newsAPIHandler = require('../api-handlers/news-api')

const marketAPIHandler = require('../api-handlers/market-data')
const { response } = require("express")


//Main page

router.get('/main', isLoggedIn, (req, res, next) => {
    res.render('information/main-page')

})

//News page

router.get('/news', isLoggedIn, (req, res, next) => {
    const compareAPI = new newsAPIHandler('https://min-api.cryptocompare.com/data/')
    compareAPI
        .getFullListNews()
        .then(response => {
            const newsData = response.data.Data
            const news = newsData.slice(0, 10)
            res.render('information/news-page', { news })
        })
        .catch(err => console.log(err))

})



//Information page
router.get('/market-data', isLoggedIn, (req, res, next) => {
    const marketApi = new marketAPIHandler('https://api.coincap.io/v2')

    // marketApi

    //     .getCryptos()

    //     .then(response => {
    //         const cryptoId = response.data.data.id
    //         cryptoId.map(elm => console.log((elm.priceUsd)))
    //     })
    //     .catch(err => console.log(err))

    res.render('information/market-data-page')
    // res.render('information/test-market-data')

})


//GET
router.get('/knowledge-form', isLoggedIn, (req, res, next) => {
    res.render('auth/role-form-page')

})

//POST 
router.post('/knowledge-form', (req, res, next) => {

    const { _id } = req.session.currentUser
    const { question1, question2, question3, question4 } = req.body

    if (question1 === 'yes' && question2 === 'yes' && question3 === 'no' && question4 === 'no' || question1 === 'yes' && question2 === 'yes' && question3 === 'yes' && question4 === 'no') {
        User
            .findByIdAndUpdate(_id, { role: 'INTERMEDIATE' })
            .then(() => res.redirect('/profile'))
            .catch(err => console.log(err))

    } else if (question1 === 'yes' && question2 === 'yes' && question3 === 'no' && question4 === 'yes') {
        User
            .findByIdAndUpdate(_id, { role: 'ADVANCED' })
            .then(() => res.redirect('/profile'))
            .catch(err => console.log(err))

    } else {
        console.log('maripili')
    }


})


//  ROUTES /KNOWLEDGE

router.get("/knowledge/blockchain", (req, res, next) => {
    res.render('./information/knowledge/blockchain')
})

router.get("/knowledge/crypto", (req, res, next) => {
    res.render('./information/knowledge/crypto')
})



module.exports = router