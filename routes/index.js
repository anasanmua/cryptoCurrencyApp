
const { setLoggedUser } = require('../middleware/user-guard.js')

module.exports = app => {

  app.use('/', setLoggedUser)

  app.use('/', require('./base.routes'))

  app.use('/', require('./auth.routes'))

  //User routes
  app.use('/', require("./user.routes"))

  app.use('/', require("./knowledge.routes"))
}

