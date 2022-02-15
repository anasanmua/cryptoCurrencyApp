const User = require("../models/User.model")
const bcrypt = require('bcrypt')
// const { firstTimeLog } = require("../middleware/user-guard")
const saltRounds = 10

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
                res.render('./auth/log-in', { errorMessage: "No se ha encontrado el usuario." })
            } else if (bcrypt.compareSync(password, user.password) === false) {
                res.render('./auth/log-in', { errorMessage: "Contraseña incorrecta." })
            } else {
                req.session.currentUser = user
                if (req.session.currentUser.firstTimeLoggedIn === true) {

                    const { _id } = req.session.currentUser
                    User
                        .findByIdAndUpdate(_id, { firstTimeLoggedIn: false })
                        .then(() => next())
                        .catch(err => next(err))

                    res.redirect('/knowledge-form')
                } else {
                    res.redirect('/profile')
                }
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
        .then(() => res.redirect("/log-in"))

})

router.get("/log-out", (req, res, next) => {
    req.session.destroy(() => res.redirect('/log-in'))
})

module.exports = router