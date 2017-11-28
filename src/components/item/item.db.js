'use strict';
/*eslint-disable no-use-before-define*/
const ItemEventEmitter = require('./../../events/item-event-emitter');
const GroupEventEmitter = require('./../../events/group-event-emitter');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItemSchema = new Schema(
  {
    retrospective: {
      type: Schema.Types.ObjectId,
      ref: 'retrospective'
    },
    category: {
      _id: {
        type: String
      },
      name: {
        type: String
      }
    },
    summary: {
      type: String,
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
    ],
    user: {
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
        { _id: this._id, retrospective: this.retrospective, 'rates.user': options.userId },
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

ItemSchema.post('save', item => {
  if (item) {
    Item.findOne({ _id: item._id }).populate({ path: 'children user' })
      .then(itemFound => {
        if (item.children.length > 0) {
          GroupEventEmitter.emit('GroupSaved', itemFound);
        } else {
          ItemEventEmitter.emit('ItemSaved', itemFound);
        }
      });
  }
});

ItemSchema.post('findOneAndUpdate', item => {
  if (item) {
    Item.findOne({ _id: item._id }).populate({ path: 'children user' })
      .then(itemFound => {
        if (item.children.length > 0) {
          GroupEventEmitter.emit('GroupUpdated', itemFound);
        } else {
          ItemEventEmitter.emit('ItemUpdated', itemFound);
        }
      });
  }
});

ItemSchema.post('findOneAndRemove', item => {
  ItemEventEmitter.emit('ItemDeleted', item);
});

const Item = mongoose.model('item', ItemSchema);

module.exports = Item;
