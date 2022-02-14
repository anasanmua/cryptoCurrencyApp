const isLoggedIn = (req, res, next) => {
    req.session.currentUser ? next() : res.render('auth/log-in', {
        errorMessage: 'Identify yourself to have access'
    })
}

module.exports = { isLoggedIn }

