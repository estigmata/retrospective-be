'use strict';
const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const retrospectiveSteps = ['add-items', 'vote-items', 'group-items', 'action-items'];

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
    ],
    creationDate: {
      type: Date,
      default: Date.now
    },
    done: {
      type: Boolean,
      default: false
    },
    currentStep: {
      type: String,
      enum: retrospectiveSteps,
      trim: true,
      default: 'add-items'
    }
  }
);

module.exports = mongoose.model('retrospective', RetrospectiveSchema);
