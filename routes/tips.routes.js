const router = require("express").Router()
const { tipOwner } = require('./../utils')
const { isLoggedIn } = require('../middleware/route-guard')
const { isAdmin } = require('../middleware/User-guard')
const Tip = require('./../models/Tips.model')


router.use('/', isLoggedIn)
router.use('/', isAdmin)

//Tips page
router.get('/', (req, res, next) => {
    Tip
        .find()
        .populate('owner')
        .then(tipList => {
            const tipListModified = tipList.map(tip => {
                return {
                    ...tip,
                    isOwner: req.session.currentUser._id === tip.owner._id.toString()
                }

            })

            const tipsArray = tipListModified.map(elm => {
                return {
                    _id: elm._doc._id,
                    title: elm._doc.title,
                    description: elm._doc.description,
                    image: elm._doc.image,
                    owner: elm._doc.owner,
                    isOwner: elm.isOwner
                }
            })
            res.render('information/tips-to-invest', { tipsArray })
        })
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

router.get('/:id/', (req, res, next) => {
    const { id } = req.params
    Tip
        .findById(id)
        .then(foundTip => res.render('information/tips-to-invest/details', foundTip))
        .catch(err => next(err))

})

router.post('/:id', (req, res, next) => {
    const { id } = req.params
    Tip
        .findByIdAndDelete(id)
        .then(() => res.redirect('/tips-to-invest'))
        .catch(err => next(err))

})

router.get('/:id/edit', (req, res, next) => {
    const { id } = req.params
    Tip
        .findById(id)
        .then(foundTip => res.render('information/tips-to-invest/edit-tip-form', foundTip))
        .catch(err => next(err))
})

router.post('/:id/edit', (req, res, next) => {
    const { id } = req.params
    Tip
        .findByIdAndUpdate(id, { ...req.body }, { new: true })
        .then(res.redirect('/tips-to-invest'))
        .catch(err => next(err))

})

module.exports = router