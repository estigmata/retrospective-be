'use strict';
const StrategyTemplateModel = require('./strategy-template.model');

class StrategyTemplateController {

  static getOneStrategy (req, res, next) {
    return StrategyTemplateModel.getStrategyTemplate(req.params.retrospectiveId).
      then(strategy => {
        res.send({ data: strategy }).status(200);
      }).
      catch(err => next(err));
  }

  static addNewStrategy (req, res, next) {
    return StrategyTemplateModel.createStategyTemplate(req.body).
      then(strategy => res.send({ data: strategy }).status(200)).
      catch(err => next(err));
  }

  static getStrategies (req, res, next) {
    return StrategyTemplateModel.getStrategyTemplatesByQuery(req.query).
      then(strategies => {
        res.send({ data: strategies }).status(200);
      }).
      catch(err => next(err));
  }
}

module.exports = StrategyTemplateController;
