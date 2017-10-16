'use strict';

const StrategyTemplate = require('./strategy-template.db');

class StrategyTemplateModel {
  static createStategyTemplate (strategy) {
    return StrategyTemplate.create(strategy).
      then(newStrategy => newStrategy).
      catch(() => {
        const error = new Error('Strategy template could not be saved');
        error.title = 'Internal server error';
        error.status = 500;
        throw error;
      });
  }

  static getStrategyTemplate (strategyId) {
    return StrategyTemplate.findById(strategyId, 'name categories').
      then(strategyFounded => {
        if (!strategyFounded) {
          const error = new Error('The Strategy Template with that id does not exist');
          error.title = 'Strategy Template not found';
          error.status = 404;
          throw error;
        }
        return strategyFounded;
      });
  }

  static getStrategyTemplatesByQuery (query) {
    return StrategyTemplate.find(query, 'name');
  }
}

module.exports = StrategyTemplateModel;
