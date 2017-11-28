'use strict';

const RetrospectiveModel = require('./retrospective.model');
const UserModel = require('../user/user.model.js');
const ConstantVariables = require('../../helpers/constant-variables');
const generateColor = require('../../helpers/generate-color');
const TeamModel = require('../team/team.model');

class RetrospectiveBussinesLogic {
  static goToNextRetrospectiveStep (retrospectiveId) {
    return RetrospectiveModel.getRetrospective(retrospectiveId)
      .then(retrospective => {
        const oldStepIndex = ConstantVariables.retrospectiveSteps.findIndex(step => step === retrospective.currentStep);
        const newStepIndex =
          oldStepIndex === ConstantVariables.retrospectiveSteps.length - 1 ? oldStepIndex : oldStepIndex + 1;
        retrospective.currentStep = ConstantVariables.retrospectiveSteps[newStepIndex];
        retrospective.done = retrospective.currentStep === 'report';
        return RetrospectiveModel.updateRetrospective(retrospectiveId, retrospective);
      })
      .then(retrospectiveUpdated => {
        return retrospectiveUpdated;
      })
      .catch(() => {
        const error = new Error('Could not update retrospective');
        error.title = 'Internal server error';
        error.status = 500;
        throw error;
      });
  }

  static generateNameOfNewRetrospective (teamId) {
    return RetrospectiveModel.getNumberofRetrospectives(teamId)
      .then(retrospectives => {
        return TeamModel.getTeamById(teamId)
          .then(teamRetrieved => 
            `${teamRetrieved.name}-${ConstantVariables.projectName}-${retrospectives + 1}`);
      });
  }

  static createNewRetrospective (newRetrospective) {
    return this.generateNameOfNewRetrospective(newRetrospective.team)
      .then(retrospectiveName => {
        newRetrospective.name = retrospectiveName;
        return RetrospectiveModel.createRetrospective(newRetrospective);
      });
  }

  static addNewUser (retrospectiveId, res) {
    return RetrospectiveModel.getRetrospective(retrospectiveId)
      .then(retrospective => {
        const newUser = {
          name: retrospective.users ? `guest${retrospective.users.length + 1}` : 'guest1',
          password: retrospective.users ? `guest${retrospective.users.length + 1}` : 'guest1',
          role: ConstantVariables.userRoles[1]
        };
        return UserModel.signUpUser(newUser)
          .then(userCreated => {
            res.set({ token: userCreated.token });
            const newColor = { h: generateColor(retrospective.users.map(user => user.color.h)) };
            const user =  { userId: userCreated.user._id, color: newColor };
            return RetrospectiveModel.addUser(retrospectiveId, user);
          });
      });
  }

  static addExistingUser (retrospectiveId, newUserId) {
    return RetrospectiveModel.getRetrospective(retrospectiveId)
      .then(retrospective => {
        const userExistsInRetro = retrospective.users
          .find(oneUser => oneUser.userId._id.toString() === newUserId.toString());
        if (userExistsInRetro) {
          const error = new Error('User already added to the retrospective');
          error.title = 'Conflict';
          error.status = 409;
          throw error;
        }
        const newColor = { h: generateColor(retrospective.users.map(user => user.color.h)) };
        const newUser = { userId: newUserId, color: newColor };
        return RetrospectiveModel.addUser(retrospective._id, newUser);
      });
  }
}

module.exports = RetrospectiveBussinesLogic;
