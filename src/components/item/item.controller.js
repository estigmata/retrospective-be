'use strict';

const ItemModel = require('./item.model');

class ItemController {
  static addNewItem (req, res, next) {
    const newItem = {
      retrospective: req.params.retrospectiveId,
      category: req.body.category,
      summary: req.body.summary
    };
    return ItemModel.createItem(newItem).
      then(item => res.send({ data: item }).status(200)).
      catch(error => next(error));
  }

  static deleteItem (req, res, next) {
    return ItemModel.deleteItem(req.params.itemId).
      then(item => res.send({ data: item }).status(200)).
      catch(error => next(error));
  }

  static getItems (req, res, next) {
    return ItemModel.getItemsByQuery(req.query).
      then(items => res.send({ data: items }).status(200)).
      catch(err => next(err));
  }

  static updateItemRate (req, res, next) {
    const voteQuantity = req.body.isIncrement ? 1 : -1;
    let itemFound;
    let totalVotes;
    ItemModel.getItem(req.params.itemId).
      then(item => {
        if (!item) {
          const error = new Error('Item could not be found');
          error.title = 'Item not found';
          error.status = 404;
          throw error;
        }
        itemFound = item;
        return ItemModel.getRatesByUser(req.params.userId);
      }).
      then(totalRates => {
        totalVotes = totalRates + voteQuantity;
        if (totalVotes > 10 && totalVotes < 0) {
          const error = new Error('Item could not be rate');
          error.title = 'Rate out of range';
          error.status = 400;
          throw error;
        }
        return ItemModel.updateItemRate(itemFound, req.params.userId, totalVotes);
      }).
      then(item => {
        res.send({ data: item }).status(200);
      }).catch(err => next(err));
  }

  static updateItem (req, res, next) {
    return ItemModel.updateItem(req.params.itemId, req.body).
      then(item => res.send({ data: item }).status(200)).
      catch(error => next(error));
  }
}

module.exports = ItemController;
