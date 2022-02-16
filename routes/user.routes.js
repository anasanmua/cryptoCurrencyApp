
const User = require("../models/User.model")
const { isLoggedIn } = require('../middleware/route-guard')
const router = require("express").Router()
const bcrypt = require('bcrypt')
const saltRounds = 10



//Profile page

router.get("/profile", isLoggedIn, (req, res, next) => {
    res.render("user/profile-page", { user: req.session.currentUser })
})


// //Edit user

//GET
router.get("/edit-profile", isLoggedIn, (req, res, next) => {

    const { _id } = req.session.currentUser

    User
        .findById(_id)
        .then(() => res.render('user/edit-profile-page'))
        .catch(err => console.log(err))
})


//POST

router.post("/edit-profile", (req, res, next) => {

    const { _id } = req.session.currentUser
    const { password } = req.body

    bcrypt
        .genSalt(saltRounds)
        .then(salt => bcrypt.hash(password, salt))
        .then(pwdHash => User.findByIdAndUpdate(_id, { ...req.body, password: pwdHash }, { new: true }))
        .then((user) => {
            req.session.currentUser = user
            res.redirect('/profile')
        })
        .catch(err => next(err))
})

// Explicación de cómo conseguir usuario actualizado: , el método findByIdAndUpdate devuelve el user antigüo, no el actualizado, cuando hacemos { new:true }, cambiamos esta condición para que nos devuelva el núevo usuario.
//Una vez tenemos el nuevo usuario
//.then((user) => {
//     req.session.currentUser = user <-- Actualizamos el currentuser a user updated!
// })
// Con esto conseguimos que el perfil se actualice


module.exports = router