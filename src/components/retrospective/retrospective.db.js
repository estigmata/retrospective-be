'use strict';
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const RetrospectiveSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    maxRate: {
      type: Number,
      default: 5
    },
    categories: [
      {
        name: {
          type: String,
          trim: true
        }
      }
    ]
  }
);

module.exports = mongoose.model('retrospective', RetrospectiveSchema);
