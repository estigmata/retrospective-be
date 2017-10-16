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
      then(result => result.length !== 0 ? result[0].total : 0);
  }

  static getItemsByQuery (query) {
    return Item.find(query);
  }

  static getItem (itemId) {
    return Item.findById(itemId).
      then(itemFound => itemFound);
  }

  static updateItemRate (item, userId, votes) {
    return Item.findOneAndUpdate(
      { _id: item._id, 'rates.user': userId },
      { $inc: { 'rates.$.quantity': votes } }
    ).
      then(itemUpdated => {
        if (!itemUpdated) {
          return Item.findByIdAndUpdate(
            item._id,
            { $push: { rates: { user: userId, quantity: votes } } },
            { new: true }
          );
        }
        return itemUpdated;
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
