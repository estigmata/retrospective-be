'use strict';
const RetrospectiveModel = require('./retrospective.model');
const RetrospectiveBussinesLogic = require('./retrospective.bussiness-logic');

class RetrospectiveController {

  static getOneRetrospective (req, res, next) {
    return RetrospectiveModel.getRetrospective(req.params.retrospectiveId).
      then(retrospective => {
        res.send({ data: retrospective }).status(200);
      }).
      catch(err => next(err));
  }

  static addNewRetrospective (req, res, next) {
    return RetrospectiveBussinesLogic.createNewRetrospective(req.body)
      .then(retrospective => res.send({ data: retrospective }).status(200))
      .catch(err => next(err));
  }

  static getRetrospectives (req, res, next) {
    return RetrospectiveModel.getRetrospectiveByQuery(req.query).
      then(retrospectives => {
        res.send({ data: retrospectives }).status(200);
      }).
      catch(err => next(err));
  }

  static updateRetrospective (req, res, next) {
    return RetrospectiveModel.updateRetrospective(req.params.retrospectiveId, req.body)
      .then(retrospectiveUpdated => {
        res.send({ data: retrospectiveUpdated }).status(200);
      })
      .catch(err => next(err));
  }

  static goForwardRetrospectiveStep (req, res, next) {
    return RetrospectiveBussinesLogic.goToNextRetrospectiveStep(req.params.retrospectiveId)
      .then(retrospectiveUpdated => {
        res.send({ data: retrospectiveUpdated }).status(200);
      })
      .catch(err => next(err));
  }

  static getNewNameOfRetrospective (req, res, next) {
    return RetrospectiveBussinesLogic.generateNameOfNewRetrospective(req.params.teamId)
      .then(retrospectiveName => {
        res.send({ name: retrospectiveName }).status(200);
      })
      .catch(err => next(err));
  }

  static addUserInToRetrospective (req, res, next) {
    const addUserOperation = req.body.userId
      ? RetrospectiveBussinesLogic.addExistingUser(req.params.retrospectiveId, req.body.userId)
      : RetrospectiveBussinesLogic.addNewUser(req.params.retrospectiveId, res);

    return addUserOperation
      .then(userIdAndColor => {
        res.send({
          data: userIdAndColor
        }).status(200);
      })
      .catch(err => next(err));
  }
}

module.exports = RetrospectiveController;
