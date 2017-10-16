'use strict';

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ItemSchema = new Schema(
  {
    retrospective: {
      type: Schema.Types.ObjectId,
      ref: 'retrospectives'
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'categories'
    },
    summary: {
      type: String,
      required: true,
      trim: true
    },
    childs: [
      {
        type: Schema.Types.ObjectId,
        ref: 'items'
      }
    ],
    rates: [
      {
        user: {
          type: String,
          trim: true
        },
        quantity: {
          type: Number,
          required: true
        }
      }
    ]
  }
);

module.exports = mongoose.model('item', ItemSchema);
