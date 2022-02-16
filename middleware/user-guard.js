const app = require('../app')
const User = require('./../models/User.model')

const setLoggedUser = (req, res, next) => {
    if (req.session) {
        //This conditional checks if there is a session open

        if (req.session.currentUser) {
            //Then it checks if there is a a logged user in the session

            req.app.locals.loggedUser = req.session.currentUser

            //Declaration of varibales
            // E.g Then it declares de variable req.app.locals.loggedUser === loggedUser ( new variable that can be used globally in the app)

            req.app.locals.roleBEGINNER = req.session.currentUser.role === "BEGINNER"
            // New variable roleBEGINNER === 'BEGINNER'

            req.app.locals.roleINTERMEDIATE = req.session.currentUser.role === "INTERMEDIATE"
            // New variable roleINTERMEDIATE === 'INTERMEDIATE'

            req.app.locals.roleADVANCED = req.session.currentUser.role === "ADVANCED"
            // New variable roleADVANCED === 'ADVANCED'

            next()
        } else {
            //Si en la sesión iniciada no hay un User logged, declara todas las variables como 'undefined'
            req.app.locals.loggedUser = false
            req.app.locals.roleBEGINNER = false
            req.app.locals.roleADVANCED = false
            req.app.locals.roleINTERMEDIATE = undefined
            next()
        }
    } else {
        //Si no existe una sesión iniciada declara todas estas variables como 'undefined'
        req.app.locals.roleBEGINNER = false
        req.app.locals.roleADVANCED = false
        req.app.locals.roleINTERMEDIATE = false
        req.app.locals.loggedUser = undefined
        next()
    }
}

const isAdmin = (req, res, next) => {
    if (req.session?.currentUser?.username === "ADMIN") {
        req.app.locals.admin = true
        next()
    }
    if (req.session?.currentUser?.username !== "ADMIN") {
        req.app.locals.admin = false
        next()
    }
    if (!req.session?.currentUser) {
        req.app.locals.admin = undefined
        next()
    }

}


module.exports = {
    setLoggedUser,
    isAdmin

}