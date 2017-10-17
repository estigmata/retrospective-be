'use strict';

const actionItemSchema = {
  'type': 'object',
  'properties': {
    'retrospectiveId': {
      'type': 'string'
    },
    'itemId': {
      'type': 'string'
    },
    'summary': {
      'type': 'string'
    }
  },
  'required': ['retrospectiveId', 'itemId', 'summary']
};

module.exports = actionItemSchema;
