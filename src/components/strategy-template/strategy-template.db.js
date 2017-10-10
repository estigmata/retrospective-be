'use strict';
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const StrategyTemplateSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
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

module.exports = mongoose.model('strategy-template', StrategyTemplateSchema);
