'use strict';

const Item = require('./item.db');
const RetrospectiveModel = require('./../retrospective/retrospective.model');
const objectID = require('mongodb').ObjectID;

class ItemModel {

  static newItem (bodyParams) {
    return RetrospectiveModel.getRetrospective(bodyParams.retrospective)
      .then(retrospective => {
        const item = {
          retrospective: bodyParams.retrospective,
          category: bodyParams.category,
          summary: bodyParams.summary,
          parent: bodyParams.parent,
          children: bodyParams.children ? bodyParams.children.map(child => child._id) : [],
          user: bodyParams.user,
          color: retrospective.users.find(user => user.userId._id.toString() === bodyParams.user.toString()).color
        };
        return Item.create(item);
      })
      .then(itemCreated => Item.findOne(itemCreated).populate({ path: 'children user' }))
      .catch(() => {
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
    return Item.find(query).populate({ path: 'children user' });
  }

  static getItem (itemId) {
    return Item.findById(itemId).populate({ path: 'children user' })
      .then(itemFound => {
        if (!itemFound) {
          const error = new Error('Item could not be found');
          error.title = 'Item not found';
          error.status = 404;
          throw error;
        }
        return itemFound;
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
        return Item.findOne(itemUdated).populate({ path: 'children user' });
      });
  }

  static getItemsWithRatesByUser (retrospectiveId, userId) {
    return Item.find({ retrospective: objectID(retrospectiveId) }).
      populate({ path: 'children user' }).
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
          'userRate': rate.length === 1 ? rate[0] : 0,
          'user': item.user,
          'color': item.color
        };
      }));
  }
}

module.exports = ItemModel;
