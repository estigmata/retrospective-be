'use strict';
const retrospectiveRoutes = require('./retrospective/retrospective.route');
const itemRoutes = require('./item/item.route');
const strategiesRoutes = require('./strategy-template/strategy-template.route');
const actionItemRoutes = require('./action-item/action-item.route');

function routes (app) {
  app.use('/retrospectives', retrospectiveRoutes);
  app.use('/items', itemRoutes);
  app.use('/strategies', strategiesRoutes);
  app.use('/action-items', actionItemRoutes);
  app.use((err, req, res, next) => {
    res.send({
      error: {
        title: err.title,
        description: err.message
      } });
    res.status(err.status || 500);
    next();
  });
}

module.exports = { routes };
