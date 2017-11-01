'use strict';

const itemSchema = {
  'type': 'object',
  'properties': {
    'category': {
      'type': 'string'
    },
    'summary': {
      'type': 'string'
    },
    'parent': {
      'type': 'boolean'
    },
    'children': {
      'type': 'array',
      'items': {
        'type': 'object'
      }
    }
  },
  'required': ['category', 'summary', 'parent']
};

module.exports = itemSchema;
