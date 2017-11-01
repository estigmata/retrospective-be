'use strict';
/*eslint-disable no-use-before-define*/

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItemSchema = new Schema(
  {
    retrospective: {
      type: Schema.Types.ObjectId,
      ref: 'retrospective'
    },
    category: {
      type: Schema.Types.ObjectId
    },
    summary: {
      type: String,
      required: true,
      trim: true
    },
    parent: {
      type: Boolean,
      required: true,
      default: true
    },
    children: [
      {
        type: Schema.Types.ObjectId,
        ref: 'item'
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

ItemSchema.methods.updateRate = function (options) {
  const pipeline = [
    { $match: { 'retrospective': this.retrospective } },
    { $unwind: '$rates' },
    { $match: { 'rates.user': { $eq: options.userId } } },
    { $group: { _id: options.userId, total: { $sum: '$rates.quantity' } } }
  ];
  return Item.aggregate(pipeline).
    then(result => {
      const userRates = result.length !== 0 ? result[0].total : 0;
      if (userRates >= options.itemRate.retrospectiveRate && options.itemRate.voteQuantity > 0) {
        const error = 'User does not have more votes';
        throw error;
      }

      const userItemRate = this.rates.find(rate => rate.user === options.userId);
      if (userItemRate) {
        const newItemQuantity = userItemRate.quantity + options.itemRate.voteQuantity;
        if (newItemQuantity < 0) {
          const error = 'Item does not have negative quantity';
          throw error;
        }
      }

      return Item.findOneAndUpdate(
        { _id: this._id, 'retrospective': this.retrospective, 'rates.user': options.userId },
        { $inc: { 'rates.$.quantity': options.itemRate.voteQuantity } },
        { new: true });
    }).
    then(itemUpdatedByUser => {
      if (!itemUpdatedByUser) {
        return Item.findByIdAndUpdate(
          this._id,
          { $push: { rates: { user: options.userId, quantity: options.itemRate.voteQuantity } } },
          { new: true }
        );
      }
      return itemUpdatedByUser;
    });
};

const Item = mongoose.model('item', ItemSchema);

module.exports = Item;
