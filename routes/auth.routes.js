const User = require("../models/User.model")
const bcrypt = require('bcrypt')
const saltRounds = 10

const router = require("express").Router()

router.get("/log-in", (req, res, next) => {
    console.log(req.session)
    res.render("./auth/log-in")
})

router.post("/log-in", (req, res, next) => {
    const { email, password } = req.body
    User
        .findOne({ email })
        .then(user => {
            if (!user) {
                res.render('./auth/log-in', { errorMessage: "No se ha encontrado el usuario." })
            } else if (bcrypt.compareSync(password, user.password) === false) {
                res.render('./auth/log-in', { errorMessage: "Contraseña incorrecta." })
            } else {
                req.session.currentUser = user
                res.redirect('/profile')
            }
        })
})

router.get("/sign-up", (req, res, next) => {
    res.render('./auth/sign-up')
})

router.post("/sign-up", (req, res, next) => {
    const { password } = req.body
    bcrypt
        .genSalt(saltRounds)
        .then(salt => bcrypt.hash(password, salt))
        .then(pwdHash => User.create({ ...req.body, password: pwdHash }))
        .then(() => res.render("./auth/log-in", { infoMessage: "You can now log in" }))
        .catch(err => next(err))
})

router.post("/log-out", (req, res, next) => {
    req.session.destroy(() => res.redirect('/log-in'))
})

module.exports = router