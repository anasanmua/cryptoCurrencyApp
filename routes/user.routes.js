const router = require("express").Router()

//Requerir middleware para chekear que el User está logeado
// const { isLoggedIn } = require()

//Requerir modelo(s)
const User = require("../models/User.model")

//Requerir bcrypt para encriptar password
const bcrypt = require('bcrypt')
const saltRounds = 10


//Profile page

router.get('/profile', (req, res, next) => {

    res.render('user/profile-page', { user: req.session.currentUser })
})

//Edit user

//GET
router.get("/edit-profile/:_id", (req, res, next) => {

    const { _id } = req.params

    User
        .findById(_id)
        .then(users => res.render('user/edit-profile-page'))
        .catch(err => console.log(err))
})

//POST
router.post('"/edit-profile/:_id"', (req, res, next) => {
    const { _id } = req.params

    const { email, username, name, description, image, password } = req.body

    User
        .findByIdAndUpdate(_id, { email, username, name, description, image, password })
        .then(() => res.redirect('/'))
        .catch(err => console.log(err))

})




module.exports = router