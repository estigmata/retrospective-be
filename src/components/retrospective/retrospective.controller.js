'use strict';
const RetrospectiveModel = require('./retrospective.model');

class RetrospectiveController {

  static getOneRetrospective (req, res, next) {
    return RetrospectiveModel.getRetrospective(req.params.retrospectiveId).
      then(retrospective => {
        res.send({ data: retrospective }).status(200);
      }).
      catch(err => next(err));
  }

  static addNewRetrospective (req, res, next) {
    return RetrospectiveModel.createRetrospective(req.body).
      then(retrospective => res.send({ data: retrospective }).status(200)).
      catch(err => next(err));
  }

  static getRetrospectives (req, res, next) {
    return RetrospectiveModel.getRetrospectiveByQuery(req.query).
      then(retrospectives => {
        res.send({ data: retrospectives }).status(200);
      }).
      catch(err => next(err));
  }
}

module.exports = RetrospectiveController;
