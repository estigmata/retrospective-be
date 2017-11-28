'use strict';

const userSchema = {
  'type': 'object',
  'properties': {
    'name': {
      'type': 'string'
    },
    'role': {
      'type': 'string',
      'enum': ['moderator', 'guest']
    },
    'password': {
      'type': 'string'
    }
  }
};

module.exports = userSchema;
