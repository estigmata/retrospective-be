'use strict';

const ActionItem = require('./action-item.db');

class ItemModel {
  static createActionItem (actionItem) {
    return ActionItem.create(actionItem).
      then(ActionItemCreated => ActionItemCreated).
      catch(() => {
        const error = new Error('Action item could not be saved');
        error.title = 'Internal server error';
        throw error;
      });
  }

  static deleteActionItem (actionItemId) {
    return ActionItem.findByIdAndRemove(actionItemId).
      then(actionItemDeleted => {
        if (!actionItemDeleted) {
          const error = new Error('Action item could not be deleted');
          error.title = 'Action item not found';
          error.status = 404;
          throw error;
        }
        return actionItemDeleted;
      });
  }

  static getActionItemsByQuery (query) {
    return ActionItem.find(query);
  }

  static gatActionItemById (actionItemId) {
    return ActionItem.findById(actionItemId, 'summary').
      then(actionItem => {
        if (!actionItem) {
          const error = new Error('The action item with that id does not exist');
          error.title = 'Action item not found';
          error.status = 404;
          throw error;
        }
        return actionItem;
      });
  }

  static updateActionItem (actionItemId, body) {
    return ActionItem.findByIdAndUpdate(actionItemId, { $set: body }, { new: true }).
      then(actionItemUdated => {
        if (!actionItemUdated) {
          const error = new Error('Action item could not be updated');
          error.title = 'Action item not found';
          error.status = 404;
          throw error;
        }
        return actionItemUdated;
      });
  }
}

module.exports = ItemModel;
