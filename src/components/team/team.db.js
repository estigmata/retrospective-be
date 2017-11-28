'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TeamSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    users: [
      {
        userId: {
          type: String,
          required: true,
          trim: true
        }
      }
    ]
  }
);

const Team = mongoose.model('team', TeamSchema);

module.exports = Team;
