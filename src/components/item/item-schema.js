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
    'childs': {
      'type': 'array'
    }
  },
  'required': ['category', 'summary']
};

module.exports = itemSchema;
