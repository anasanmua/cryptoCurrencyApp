const app = require('../app')
const User = require('./../models/User.model')

const setLoggedUser = (req, res, next) => {
    if (req.session) {
        if (req.session.currentUser) {
            req.app.locals.loggedUser = req.session.currentUser
            next()
        } else {
            next()
        }
    } else {
        next()
    }
}



module.exports = {
    setLoggedUser
}