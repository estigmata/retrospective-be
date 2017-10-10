'use strict';
const Retrospective = require('./retrospective.db');

class RetrospectiveModel {

  static getRetrospective (retroId) {
    return Retrospective.findById(retroId, 'name categories maxRate').
      then(retrospective => {
        if (!retrospective) {
          const error = new Error('The retrospective with that id does not exist');
          error.title = 'Retrospective not found';
          error.status = 404;
          throw error;
        }
        return retrospective;
      });
  }

  static createRetrospective (retro) {
    return Retrospective.create(retro).
      catch(() => {
        const error = new Error('Could not save');
        error.title = 'Internal server error';
        error.status = 500;
        throw error;
      });
  }

  static getRetrospectiveByQuery (query) {
    return Retrospective.find(query, 'name').
      then(retrospectives => {
        if (!retrospectives.length) {
          const error = new Error('The retrospectives with those params do not exist');
          error.title = 'Retrospective not found';
          error.status = 404;
          throw error;
        }
        return retrospectives;
      });
  }

}

module.exports = RetrospectiveModel;
