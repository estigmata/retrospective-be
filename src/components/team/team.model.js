'use strict';
const Team = require('./team.db');

class TeamModel {
  static getTeamsByQuery (query) {
    return Team.find(query);
  }

  static getUserTeams (query) {
    return Team.find().elemMatch('users', { userId: query.userId });
  }

  static createTeam (newTeam) {
    return Team.create(newTeam).
      catch(() => {
        const error = new Error('Could not save');
        error.title = 'Internal server error';
        error.status = 500;
        throw error;
      });
  }

  static updateTeam (teamId, body) {
    return Team.findByIdAndUpdate(teamId, { $set: body }, { new: true }).
      then(teamUpdated => {
        if (!teamUpdated) {
          const error = new Error('Team could not be updated');
          error.title = 'Team not found';
          error.status = 404;
          throw error;
        }
        return teamUpdated;
      });
  }

  static getTeamById (teamId) {
    return Team.findById(teamId).
      then(teamRetrieved => {
        if (!teamRetrieved) {
          const error = new Error('Team could not be retrieved');
          error.title = 'Team not found';
          error.status = 404;
          throw error;
        }
        return teamRetrieved;
      });
  }
}

module.exports = TeamModel;
