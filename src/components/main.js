'use strict';
const retrospectiveRoutes = require('./retrospective/retrospective.route');
const itemRoutes = require('./item/item.route');
const strategiesRoutes = require('./strategy-template/strategy-template.route');
const actionItemRoutes = require('./action-item/action-item.route');
const userRoutes = require('./user/user.route');
const teamRoutes = require('./team/team.route');

function routes (app) {
  app.use('/retrospectives', retrospectiveRoutes);
  app.use('/items', itemRoutes);
  app.use('/strategies', strategiesRoutes);
  app.use('/action-items', actionItemRoutes);
  app.use('/users', userRoutes);
  app.use('/teams', teamRoutes);

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
