const app = require('../app')
const User = require('./../models/User.model')

const setLoggedUser = (req, res, next) => {
    if (req.session) {
        if (req.session.currentUser) {
            req.app.locals.loggedUser = req.session.currentUser
            next()
        } else {
            req.app.locals.loggedUser = undefined
            next()
        }
    } else {
        req.app.locals.loggedUser = undefined
        next()
    }
}



module.exports = {
    setLoggedUser
}