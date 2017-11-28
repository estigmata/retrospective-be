'use strict';
const Retrospective = require('./retrospective.db');

class RetrospectiveModel {

  static getRetrospective (retroId) {
    return Retrospective.findById(retroId, 'name categories maxRate currentStep users.userId users.color')
      .populate({ path: 'users.userId' }).
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
    return Retrospective.find(query);
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

  static getNumberofRetrospectives (teamId) {
    return Retrospective.count({team: teamId})
      .then(numberOfRetrospectives => {
        return numberOfRetrospectives;
      });
  }

  static addUser (retrospectiveId, user) {
    return Retrospective.findByIdAndUpdate(retrospectiveId, { $push: { users: user } }, { new: true })
      .populate({ path: 'users.userId' })
      .then(retrospectiveUpdate => {
        if (!retrospectiveUpdate) {
          const error = new Error('Retrospective could not be updated');
          error.title = 'Retrospective not found';
          error.status = 404;
          throw error;
        }
        return retrospectiveUpdate.users[retrospectiveUpdate.users.length - 1];
      });
  }

  static findOneUser (retrospectiveId, userId) {
    return Retrospective.findById(retrospectiveId).populate({ path: 'users.userId' })
      .then(retrospective => {
        if (!retrospective) {
          const error = new Error('Retrospective could not be updated');
          error.title = 'Retrospective not found';
          error.status = 404;
          throw error;
        }
        return retrospective.users.find(user => user.userId._id.toString() === userId.toString());
      });
  }

}

module.exports = RetrospectiveModel;
