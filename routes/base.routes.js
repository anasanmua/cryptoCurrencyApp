const router = require("express").Router()

router.get("/", (req, res, next) => {
    console.log(req.app.locals.loggedUser)
    res.render("index")
})
router.get("/contact-us", (req, res, next) => {
    res.render('contact')
})

module.exports = router