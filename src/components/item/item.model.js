'use strict';

const Item = require('./item.db');

class ItemModel {
  static createItem (item) {
    return Item.create(item).
      then(itemCreated => itemCreated).
      catch(() => {
        const error = new Error('Item could not be saved');
        error.title = 'Internal server error';
        error.status = 500;
        throw error;
      });
  }

  static deleteItem (itemId) {
    return Item.findByIdAndRemove(itemId).
      then(itemDeleted => {
        if (!itemDeleted) {
          const error = new Error('Item could not be deleted');
          error.title = 'Item not found';
          error.status = 404;
          throw error;
        }
        return itemDeleted;
      }).
      catch(() => {
        const error = new Error('Item could not deleted');
        error.title = 'Internal server error';
        error.status = 500;
        throw error;
      });
  }

  static getRatesByUser (userId) {
    const pipeline = [
      { $unwind: '$rates' },
      { $match: { 'rates.user': { $eq: userId } } },
      { $group: { _id: 1, total: { $sum: '$rates.quantity' } } }
    ];
    return Item.aggregate(pipeline).
      then(result => result[0].total);
  }

  static getItemsByQuery (query) {
    return Item.find(query);
  }

  static updateItemRate (itemId, userId, isIncrement) {
    return Item.findById(itemId).
      then(itemFound => {
        if (!itemFound) {
          const error = new Error('Item could not be found');
          error.title = 'Item not found';
          error.status = 404;
          throw error;
        }

        if (itemFound.rates.findIndex(rate => rate.user === userId) > -1) {
          return Item.findOneAndUpdate(
            { 'rates.user': userId },
            { $inc: { 'rates.$.quantity': isIncrement ? 1 : -1 } },
            { new: true }
          );
        }

        return Item.findByIdAndUpdate(
          itemId,
          { $push: { rates: { user: userId, quantity: 1 } } },
          { new: true }
        );
      });
  }

  static updateItem (itemId, body) {
    return Item.findByIdAndUpdate(itemId, { $set: body }, { new: true }).
      then(itemUdated => {
        if (!itemUdated) {
          const error = new Error('Item could not be updated');
          error.title = 'Item not found';
          error.status = 404;
          throw error;
        }
        return itemUdated;
      });
  }
}

module.exports = ItemModel;
