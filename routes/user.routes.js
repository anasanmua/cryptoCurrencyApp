const router = require("express").Router()

//Requerir middleware para chekear que el User está logeado
const { isLoggedIn } = require('../middleware/route-guard')

//Requerir modelo(s)
const User = require("../models/User.model")

//Requerir bcrypt para encriptar password
const bcrypt = require('bcrypt')
const req = require("express/lib/request")
const saltRounds = 10


//Profile page

router.get("/profile", isLoggedIn, (req, res, next) => {
    console.log(req.app.locals, '-----------', req.session.currentUser)
    res.render("user/profile-page", { user: req.session.currentUser })
})

//Main page

router.get('/main', isLoggedIn, (req, res, next) => {
    res.render('information/main-page')

})

//News page

router.get('/news', isLoggedIn, (req, res, next) => {
    res.render('information/news-page')

})

//Tips page
router.get('/tips-to-invest', isLoggedIn, (req, res, next) => {
    res.render('information/tips-to-invest-page')

})

//Information page
router.get('/market-data', isLoggedIn, (req, res, next) => {
    res.render('information/market-data-page')

})



//Edit user

//GET
router.get("/edit-profile", isLoggedIn, (req, res, next) => {

    const { _id } = req.session.currentUser


    User
        .findById(_id)
        .then(users => res.render('user/edit-profile-page'))
        .catch(err => console.log(err))
})

//POST
router.post("/edit-profile", (req, res, next) => {

    const { _id } = req.session.currentUser

    const { email, username, name, description, image, password } = req.body

    User
        .findByIdAndUpdate(_id, { email, username, name, description, image, password }, { new: true })
        .then((user) => {
            req.session.currentUser = user
            res.redirect('/profile')
        })
        .catch(err => console.log(err))



})

router.post("/edit-profile", (req, res, next) => {

    const { password } = req.body

    bcrypt
        .genSalt(saltRounds)
        .then(salt => bcrypt.hash(password, salt))
        .then(pwdHash => User.findByIdAndUpdate({ ...req.body, password: pwdHash }))
        .then((user) => {
            req.session.currentUser = user
            res.redirect('/profile')
        })
        .catch(err => next(err))
})


//Explicación de cómo conseguir usuario actualizado: , el método findByIdAndUpdate devuelve el user antigüo, no el actualizado, cuando hacemos { new:true }, cambiamos esta condición para que nos devuelva el núevo usuario. 
//Una vez tenemos el nuevo usuario 
//.then((user) => {
//     req.session.currentUser = user <-- Actualizamos el currentuser a user updated!
// })
// Con esto conseguimos que el perfil se actualice

router.get("/knowledge/crypto", (req, res, next) => {
    res.render('./information/knowledge/crypto')
})

router.get("/knowledge/blockchain", (req, res, next) => {
    res.render('./information/knowledge/blockchain')
})


module.exports = router

