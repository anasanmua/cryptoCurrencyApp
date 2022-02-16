const router = require("express").Router()
const { isLoggedIn } = require('../middleware/route-guard')
const Tip = require('./../models/Tips.model')


router.use('/', isLoggedIn)

//Tips page
router.get('/', (req, res, next) => {
    Tip
        .find()
        .then(tipList => res.render('information/tips-to-invest', { tipList }))
        .catch(err => next(err))
})


router.get('/create', (req, res, next) => {
    res.render('information/tips-to-invest/create-form')
})

router.post('/create', (req, res, next) => {
    const { title, description, image } = req.body
    Tip
        .create({ title, description, image })
        .then(() => res.redirect('/tips-to-invest'))
        .catch(err => console.log(err))
})

module.exports = router