'use strict';

const RetrospectiveModel = require('./retrospective.model');
const retrospectiveSteps = ['add-items', 'group-items', 'vote-items', 'action-items'];

class RetrospectiveBussinesLogic {
  static goToNextRetrospectiveStep (retrospectiveId) {
    return RetrospectiveModel.getRetrospective(retrospectiveId)
      .then(retrospective => {
        const oldStepIndex = retrospectiveSteps.findIndex(step => step === retrospective.currentStep);
        const newStepIndex = oldStepIndex === retrospectiveSteps.length - 1 ? oldStepIndex : oldStepIndex + 1;
        retrospective.currentStep = retrospectiveSteps[newStepIndex];
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
}

module.exports = RetrospectiveBussinesLogic;
