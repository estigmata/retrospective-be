'use strict';
const Retrospective = require('./retrospective.db');

class RetrospectiveModel {

  static getRetrospective (retroId) {
    return Retrospective.findById(retroId, 'name categories maxRate currentStep').
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
    // Delete this attribute from object because in the model the creation date is autogenerate.
    delete retro.creationDate;
    return Retrospective.create(retro).
      catch(() => {
        const error = new Error('Could not save');
        error.title = 'Internal server error';
        error.status = 500;
        throw error;
      });
  }

  static getRetrospectiveByQuery (query) {
    return Retrospective.find(query).
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

  static updateRetrospective (retrospectiveId, body) {
    return Retrospective.findByIdAndUpdate(retrospectiveId, { $set: body }, { new: true }).
      then(RetrospectiveUpdated => {
        if (!RetrospectiveUpdated) {
          const error = new Error('Retrospective could not be updated');
          error.title = 'Retrospective not found';
          error.status = 404;
          throw error;
        }
        return RetrospectiveUpdated;
      });
  }

}

module.exports = RetrospectiveModel;
