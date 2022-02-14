const app = require('../app')
const User = require('./../models/User.model')

const setLoggedUser = (req, res, next) => {
    if (req.session) {
        if (req.session.currentUser) {
            req.app.locals.loggedUser = req.session.currentUser
            req.app.locals.roleBEGINNER = req.session.currentUser.role === "BEGINNER"
            req.app.locals.roleADVANCED = req.session.currentUser.role === "ADVANCED"
            req.app.locals.roleINTERMEDIATE = req.session.currentUser.role === "INTERMEDIATE"
            next()
        } else {
            req.app.locals.loggedUser = undefined
            req.app.locals.roleBEGINNER = undefined
            req.app.locals.roleADVANCED = undefined
            req.app.locals.roleINTERMEDIATE = undefined
            next()
        }
    } else {
        req.app.locals.roleBEGINNER = undefined
        req.app.locals.roleADVANCED = undefined
        req.app.locals.roleINTERMEDIATE = undefined
        req.app.locals.loggedUser = undefined
        next()
    }
}



module.exports = {
    setLoggedUser
}