'use strict';

const retrospectiveSchema = {
  'type': 'object',
  'properties': {
    'name': {
      'type': 'string'
    },
    'maxRate': {
      'type': 'number'
    },
    'done': {
      'type': 'boolean'
    },
    'currentStep': {
      'type': 'string',
      'enum': ['add-items', 'group-items', 'vote-items', 'action-items']
    }
  }
};

module.exports = retrospectiveSchema;
