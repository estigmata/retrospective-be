'use strict';

const ActionItemModel = require('./action-item.model');

class ActionItemController {
  static addNewActionItem (req, res, next) {
    return ActionItemModel.createActionItem(req.body).
      then(actionItem => res.send({ data: actionItem }).status(200)).
      catch(next);
  }

  static deleteActionItem (req, res, next) {
    return ActionItemModel.deleteActionItem(req.params.actionItemId).
      then(actionItem => res.send({ data: actionItem }).status(200)).
      catch(next);
  }

  static getActionItems (req, res, next) {
    return ActionItemModel.getActionItemsByQuery(req.query).
      then(actionItems => res.send({ data: actionItems }).status(200)).
      catch(next);
  }

  static getActionItem (req, res, next) {
    return ActionItemModel.getActionItemById(req.params.actionItemId).
      then(actionItems => res.send({ data: actionItems }).status(200)).
      catch(next);
  }

  static updateActionItem (req, res, next) {
    return ActionItemModel.updateActionItem(req.params.actionItemId, req.body).
      then(actionItem => res.send({ data: actionItem }).status(200)).
      catch(next);
  }
}

module.exports = ActionItemController;
