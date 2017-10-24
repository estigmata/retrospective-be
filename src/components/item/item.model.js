'use strict';

const Item = require('./item.db');
const ObjectID = require("mongodb").ObjectID;

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

  static getRatesByUser (retrospectiveId, userId) {
    const pipeline = [
      { $match: { retrospective: ObjectID(retrospectiveId) } },
      { $unwind: '$rates' },
      { $match: { 'rates.user': { $eq: ObjectID(userId) } } },
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
      then(itemFound => {
        if (!itemFound) {
          const error = new Error('Item could not be found');
          error.title = 'Item not found';
          error.status = 404;
          throw error;
        }
        return itemFound;
      });
  }

  static userCanRate (userRates, voteQuantity, retrospectiveRateByUser) {
    if (
      (userRates + voteQuantity) > retrospectiveRateByUser ||
      (userRates + voteQuantity) < 0) {
      const error = new Error('Item could not be rate');
      error.title = 'Rate out of range';
      error.status = 400;
      return Promise.reject(error);
    }
    return Promise.resolve(true);
  }

  static updateItemRate (item, userId, votes) {
    return Item.findOneAndUpdate(
      { _id: item._id, 'retrospective': item.retrospective, 'rates.user': userId },
      { $inc: { 'rates.$.quantity': votes } },
      { new: true },
      itemUpdatedByUser => {
        if (!itemUpdatedByUser) {
          return Item.findByIdAndUpdate(
            item._id,
            { $push: { rates: { user: userId, quantity: votes } } },
            { new: true }
          );
        }
        return itemUpdatedByUser;
      }
    );
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

  static getRatesByItem (retrospectiveId) {
    const pipe = [
      { $match: { retrospective: ObjectID(retrospectiveId) } },
      { $unwind: '$rates' },
      { $group: { _id: '$_id', summary: { $first: '$summary' }, totalRates: { $sum: '$rates.quantity' } } },
      { $sort: { totalRates: -1 } }
    ];
    return Item.aggregate(pipe).
      then(result => result);
  }

}

module.exports = ItemModel;
