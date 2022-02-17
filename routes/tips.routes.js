const router = require("express").Router()
const { tipOwner } = require('./../utils')
const { isLoggedIn } = require('../middleware/route-guard')
const { isAdmin } = require('../middleware/User-guard')
const Tip = require('./../models/Tips.model')


router.use('/', isLoggedIn)
router.use('/', isAdmin)

//Tips page
router.get('/', (req, res, next) => {
    console.log(req.app.locals.loggedUser)
    Tip
        .find()
        .populate('owner')
        .then(tipList => res.render('information/tips-to-invest', { tipList }))
        .catch(err => next(err))
})


router.get('/create', (req, res, next) => {
    res.render('information/tips-to-invest/create-form')
})

router.post('/create', (req, res, next) => {
    const { title, description, image } = req.body
    Tip
        .create({ title, description, image, owner: req.session.currentUser._id })
        .then(() => res.redirect('/tips-to-invest'))
        .catch(err => {
            if (description.length < 100) {
                res.render('information/tips-to-invest/create-form', { descriptionMessage: "Description must contain more than 100 letters" })
            } else {
                next(err)
            }
        })

})

router.post('/:id', (req, res, next) => {
    const { id } = req.params
    Tip
        .findByIdAndDelete(id)
        .then(() => res.redirect('/tips-to-invest'))
        .catch(err => console.log(err))

})

router.get('/:id/edit', (req, res, next) => {
    const { id } = req.params
    Tip
        .findById(id)
        .then(foundTip => res.render('information/tips-to-invest/edit-tip-form', foundTip))
        .catch(err => console.log(err))
})

router.post('/:id/edit', (req, res, next) => {
    const { id } = req.params
    Tip
        .findByIdAndUpdate(id, { ...req.body }, { new: true })
        .then(res.redirect('/tips-to-invest'))
        .catch(err => console.log(err))

})

module.exports = router