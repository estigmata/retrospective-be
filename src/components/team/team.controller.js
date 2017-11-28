'use strict';
const TeamModel = require('./team.model');

class TeamController {

  static addNewTeam (req, res, next) {
    return TeamModel.createTeam(req.body)
      .then(team => {
        res.send({ data: team }).status(200);
      })
      .catch(err => next(err));
  }

  static getTeams (req, res, next) {
    return TeamModel.getTeamsByQuery(req.query)
      .then(teams => {
        res.send({ data: teams }).status(200);
      })
      .catch(err => next(err));
  }

  static getUserTeams (req, res, next) {
    return TeamModel.getUserTeams(req.query)
      .then(teams => res.send({ data: teams }).status(200))
      .catch(err => next(err));
  }

  static updateTeam (req, res, next) {
    return TeamModel.updateTeam(req.params.teamId, req.body)
      .then(team => {
        res.send({ data: team }).status(200);
      })
      .catch(err => next(err));
  }

  static getTeam (req, res, next) {
    return TeamModel.getTeamById(req.params.teamId)
      .then(team => {
        res.send({ data: team }).status(200);
      })
      .catch(err => next(err));
  }

}

module.exports = TeamController;
