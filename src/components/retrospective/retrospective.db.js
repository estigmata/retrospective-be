'use strict';
const mongoose = require('mongoose');
const RetrospectiveEventEmitter = require('./../../events/retrospective-event-emitter');

const Schema = mongoose.Schema;
const retrospectiveSteps = ['add-items', 'vote-items', 'group-items', 'action-items', 'report'];

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
    },
    users: [
      {
        userId: {
          type: Schema.Types.ObjectId,
          ref: 'user'
        },
        color: {
          h: {
            type: Number
          },
          s: {
            type: Number,
            default: 80
          },
          l: {
            type: Number,
            default: 80
          }
        }
      }
    ],
    team: {
      type: Schema.Types.ObjectId,
      ref: 'team'
    }
  }
);

RetrospectiveSchema.post('findOneAndUpdate', retrospective => {
  RetrospectiveEventEmitter.emit('RetrospectiveUpdated', retrospective);
});

module.exports = mongoose.model('retrospective', RetrospectiveSchema);
