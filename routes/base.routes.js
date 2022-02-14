const router = require("express").Router()

router.get("/", (req, res, next) => {
    res.render("index")
})
router.get("/contact-us", (req, res, next) => {
    res.send('contact us!! :)')
})

module.exports = router