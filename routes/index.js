module.exports = app => {
  app.use('/', require('./base.routes'))

  //User routes
  app.use('/', require("./user.routes"))


}

