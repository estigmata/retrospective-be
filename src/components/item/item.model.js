'use strict';

const Item = require('./item.db');
const RetrospectiveModel = require('./../retrospective/retrospective.model');
const objectID = require('mongodb').ObjectID;

class ItemModel {
  static createItem (item) {
    return Item.create(item).
      then(itemCreated => Item.findOne(itemCreated).populate('children')).
      catch(() => {
        const error = new Error('Item could not be saved');
        error.title = 'Internal server error';
        error.status = 500;
        throw error;
      });
  }

  static newItem (params) {
    const item = {
      retrospective: params.retrospective,
      category: params.category,
      summary: params.summary
    };
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

  static getItemsByQuery (query) {
    return Item.find(query).populate('children');
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

  static updateItemRate (itemId, userId, itemRate) {
    let itemFound;
    return ItemModel.getItem(itemId).
      then(item => {
        itemFound = item;
        return RetrospectiveModel.getRetrospective(itemFound.retrospective);
      }).
      then(retrospective => {
        itemRate.retrospectiveRate = retrospective.maxRate;
        return itemFound.updateRate({ userId, itemRate });
      }).
      catch(errorDescription => {
        const error = new Error(errorDescription);
        error.title = 'Rate out of range';
        error.status = 400;
        throw error;
      });
  }

  static updateItemRateByUser (itemId, params) {
    let itemFound;
    const userId = params.userId;
    const itemRate = {
      'voteQuantity': params.isIncrement ? 1 : -1
    };
    return ItemModel.getItem(itemId).
      then(item => {
        itemFound = item;
        return RetrospectiveModel.getRetrospective(itemFound.retrospective);
      }).
      then(retrospective => {
        itemRate.retrospectiveRate = retrospective.maxRate;
        return itemFound.updateRate({ userId, itemRate });
      }).
      catch(errorDescription => {
        const error = new Error(errorDescription);
        error.title = 'Rate out of range';
        error.status = 400;
        throw error;
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
        return Item.findOne(itemUdated).populate('children');
      });
  }

  static getItemsWithRatesByUser (retrospectiveId, userId) {
    return Item.find({ retrospective: objectID(retrospectiveId) }).
      populate('children').
      then(items => items.map(item => {
        const rate = item.rates.map(itemRate => {
          if (itemRate.user === userId) {
            return itemRate.quantity;
          }
          return 0;
        }).filter(votes => votes > 0);
        return {
          '_id': item._id,
          'retrospective': item.retrospective,
          'category': item.category,
          'summary': item.summary,
          'rates': item.rates,
          'children': item.children,
          'parent': item.parent,
          'userRate': rate.length === 1 ? rate[0] : 0
        };
      }));
  }
}

module.exports = ItemModel;
