module.exports = app => {
  app.use('/', require('./base.routes'))
  // app.use('/mapas', require('./maps.routes'))
  // app.use('/restaurantes', require('./restaurants.routes'))
  // app.use('/api', require('./api.routes'))
}