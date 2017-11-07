'use strict';

const RetrospectiveModel = require('./retrospective.model');
const RetrospectiveData = require('../../helpers/constant-variables');

class RetrospectiveBussinesLogic {
  static goToNextRetrospectiveStep (retrospectiveId) {
    return RetrospectiveModel.getRetrospective(retrospectiveId)
      .then(retrospective => {
        const oldStepIndex = RetrospectiveData.retrospectiveSteps.findIndex(step => step === retrospective.currentStep);
        const newStepIndex = oldStepIndex === RetrospectiveData.retrospectiveSteps.length - 1 ? oldStepIndex : oldStepIndex + 1;
        retrospective.currentStep = RetrospectiveData.retrospectiveSteps[newStepIndex];
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

  static generateNameOfNewRetrospective () {
    return RetrospectiveModel.getNumberofRetrospectives()
      .then(retrospectives => {
        return `${RetrospectiveData.teamName}-${RetrospectiveData.projectName}-${retrospectives + 1}`;
      });
  }

  static createNewRetrospective (newRetrospective) {
    return this.generateNameOfNewRetrospective()
      .then(retrospectiveName => {
        newRetrospective.name = retrospectiveName;
        return RetrospectiveModel.createRetrospective(newRetrospective);
      });
  }
}

module.exports = RetrospectiveBussinesLogic;
