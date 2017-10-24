'use strict';

const ItemModel = require('./item.model');
const RetrospectiveModel = require('../retrospective/retrospective.model');

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
      catch(error => next(error));
  }

  static getRatesByItem (req, res, next) {
    return ItemModel.getRatesByItem(req.params.retrospectiveId).
      then(items => res.send({ data: items }).status(200)).
      catch(error => next(error));
  }

  static updateItemRate (req, res, next) {
    const voteQuantity = req.body.isIncrement ? 1 : -1;
    let itemFound;
    let retrospectiveRateByUser;
    ItemModel.getItem(req.params.itemId).
      then(item => {
        itemFound = item;
        return RetrospectiveModel.getRetrospective(item.retrospective);
      }).
      then(retrospective => {
        retrospectiveRateByUser = retrospective.maxRate;
        return ItemModel.getRatesByUser(itemFound.retrospective, req.params.userId);
      }).
      then(userRates => ItemModel.userCanRate(userRates, voteQuantity, retrospectiveRateByUser)).
      then(() => ItemModel.updateItemRate(itemFound, req.params.userId, voteQuantity)).
      then(item => res.send({ data: item }).status(200)).
      catch(error => next(error));
  }

  static updateItem (req, res, next) {
    return ItemModel.updateItem(req.params.itemId, req.body).
      then(item => res.send({ data: item }).status(200)).
      catch(error => next(error));
  }
}

module.exports = ItemController;
