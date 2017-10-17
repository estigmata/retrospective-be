'use strict';

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
      ref: 'items'
    },
    summary: {
      type: String,
      required: true,
      trim: true
    }
  }
);

module.exports = mongoose.model('action-items', ActionItemSchema);
