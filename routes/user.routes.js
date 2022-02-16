const router = require("express").Router()

//Requerir middleware para chekear que el User está logeado
const { isLoggedIn } = require('../middleware/route-guard')

//Requerir modelo(s)
const User = require("../models/User.model")

//Requerir bcrypt para encriptar password
const bcrypt = require('bcrypt')
const saltRounds = 10

const newsAPIHandler = require('../api-handlers/news-api')

//Profile page

router.get("/profile", isLoggedIn, (req, res, next) => {
    res.render("user/profile-page", { user: req.session.currentUser })
})

//Main page

router.get('/main', isLoggedIn, (req, res, next) => {
    res.render('information/main-page')

})

//News page

router.get('/news', isLoggedIn, (req, res, next) => {
    const compareAPI = new newsAPIHandler('https://min-api.cryptocompare.com/data/')
    compareAPI
        .getFullListNews()
        .then(response => {
            const noticias = response.data.Data
            console.log()
            res.render('information/news-page', { noticias })
        })
        .catch(err => console.log(err))

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
        .then(user => res.render('user/edit-profile-page'))
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

//Explicación de cómo conseguir usuario actualizado: , el método findByIdAndUpdate devuelve el user antigüo, no el actualizado, cuando hacemos { new:true }, cambiamos esta condición para que nos devuelva el núevo usuario.
//Una vez tenemos el nuevo usuario
//.then((user) => {
//     req.session.currentUser = user <-- Actualizamos el currentuser a user updated!
// })
// Con esto conseguimos que el perfil se actualice

router.get("/knowledge/crypto", (req, res, next) => {
    res.render('./information/knowledge/crypto')
})
//Role form

//GET
router.get('/knowledge-form', isLoggedIn, (req, res, next) => {
    res.render('auth/role-form-page')

})

//POST 
router.post('/knowledge-form', (req, res, next) => {

    const { _id } = req.session.currentUser

    const { question1, question2, question3, question4 } = req.body

    const { role } = req.session.currentUser


    if (question1 === 'yes' && question2 === 'yes' && question3 === 'no' && question4 === 'no' || question1 === 'yes' && question2 === 'yes' && question3 === 'yes' && question4 === 'no') {
        User
            .findByIdAndUpdate(_id, { role: 'INTERMEDIATE' })
            .then(() => res.redirect('/profile'))
            .catch(err => console.log(err))

    } else if (question1 === 'yes' && question2 === 'yes' && question3 === 'no' && question4 === 'yes') {
        User
            .findByIdAndUpdate(_id, { role: 'ADVANCED' })
            .then(() => res.redirect('/profile'))
            .catch(err => console.log(err))

    } else {
        console.log('maripili')
    }


})




router.get("/knowledge/blockchain", (req, res, next) => {
    res.render('./information/knowledge/blockchain')
})


module.exports = router

