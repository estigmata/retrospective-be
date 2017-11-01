'use strict';

const ItemModel = require('./item.model');

class ItemController {
  static addNewItem (req, res, next) {
    const newItem = {
      retrospective: req.params.retrospectiveId,
      category: req.body.category,
      summary: req.body.summary,
      parent: req.body.parent,
      children: req.body.children ? req.body.children.map(child => child._id) : []
    };
    return ItemModel.createItem(newItem).
      then(item => res.send({ data: item }).status(200)).
      catch(error => next(error));
  }

  static newItem (req, res, next) {
    return ItemModel.newItem(req.body).
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
      then(items => res.send({ data: items.reverse() }).status(200)).
      catch(error => next(error));
  }

  static updateItemRate (req, res, next) {
    const itemRate = {
      'voteQuantity': req.body.isIncrement ? 1 : -1
    };
    return ItemModel.updateItemRate(req.params.itemId, req.params.userId, itemRate).
      then(item => res.send({ data: item }).status(200)).
      catch(error => next(error));
  }

  static updateItem (req, res, next) {
    req.body.children = req.body.children ? req.body.children.map(child => child._id) : [];
    return ItemModel.updateItem(req.params.itemId, req.body).
      then(item => res.send({ data: item }).status(200)).
      catch(error => next(error));
  }

  static getItemsWithRatesByUser (req, res, next) {
    return ItemModel.getItemsWithRatesByUser(req.params.retrospectiveId, req.params.userId).
      then(items => res.send({ data: items }).status(200)).
      catch(error => next(error));
  }

  static updateItemRateByUser (req, res, next) {
    return ItemModel.updateItemRateByUser(req.params.itemId, req.body).
      then(item => res.send({ data: item }).status(200)).
      catch(error => next(error));
  }

  static getRatesItemByUser (req, res, next) {
    return ItemModel.getItemsWithRatesByUser(req.query.retrospectiveId, req.query.userId).
      then(items => res.send({ data: items }).status(200)).
      catch(error => next(error));
  }
}

module.exports = ItemController;
