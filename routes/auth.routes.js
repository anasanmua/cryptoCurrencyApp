const User = require("../models/User.model")

const router = require("express").Router()

router.get("/log-in", (req, res, next) => {
    res.render("./auth/log-in")
})

router.post("/log-in", (req, res, next) => {
    const { email, password } = req.body
    User
        .findOne({ email })
        .then(user => {
            if (!user) {
                res.render('')
            }
        })
    res.send("log-in handler")
})

router.get("/sign-up", (req, res, next) => {
    res.render('./auth/sign-up')
})

router.post("/sign-up", (req, res, next) => {
    const { email, username, name, description, image, password } = req.body
    User
        .create({ email, username, name, description, image, password })
        .then(() => res.redirect("/main"))
        .catch(err => next(err))
})

router.post("/log-out", (req, res, next) => {
    res.send("logout handler")
})

module.exports = router