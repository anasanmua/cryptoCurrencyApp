module.exports = app => {
  app.use('/', require('./base.routes'))

  app.use('/', require('./auth.routes'))

  //User routes
  app.use('/', require("./user.routes"))
}

