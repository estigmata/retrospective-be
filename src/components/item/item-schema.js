'use strict';

const itemSchema = {
  'type': 'object',
  'properties': {
    'category': {
      'type': 'object',
      'properties': {
        '_id': {
          'type': 'string'
        },
        'name': {
          'type': 'string'
        }
      }
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
    },
    'user': {
      'type': 'string'
    }
  },
  'required': ['category', 'parent', 'user']
};

module.exports = itemSchema;
