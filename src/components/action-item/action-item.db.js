'use strict';
const ActionItemEventEmitter = require('./../../events/action-item-event-emitter');

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ActionItemSchema = new Schema(
  {
    retrospectiveId: {
      type: Schema.Types.ObjectId,
      ref: 'retrospectives'
    },
    itemId: {
      type: Schema.Types.ObjectId,
      ref: 'item'
    },
    summary: {
      type: String,
      required: true,
      trim: true
    }
  }
);

ActionItemSchema.post('save', actionItem => {
  ActionItemEventEmitter.emit('ActionItemSaved', actionItem);
});

ActionItemSchema.post('findOneAndUpdate', item => {
  ActionItemEventEmitter.emit('ActionItemUpdated', item);
});

module.exports = mongoose.model('action-items', ActionItemSchema);
