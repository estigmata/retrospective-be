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
    return ItemModel.updateItemRate(req.params.itemId, req.params.userId, req.body.isIncrement).
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
