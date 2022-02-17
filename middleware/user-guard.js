
const setLoggedUser = (req, res, next) => {
    if (req.session) {
        if (req.session.currentUser) {
            req.app.locals.loggedUser = req.session.currentUser
            req.app.locals.roleBEGINNER = req.session.currentUser.role === "BEGINNER"
            req.app.locals.roleINTERMEDIATE = req.session.currentUser.role === "INTERMEDIATE"
            req.app.locals.roleADVANCED = req.session.currentUser.role === "ADVANCED"
            next()
        } else {
            req.app.locals.loggedUser = false
            req.app.locals.roleBEGINNER = false
            req.app.locals.roleADVANCED = false
            req.app.locals.roleINTERMEDIATE = undefined
            next()
        }
    } else {
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