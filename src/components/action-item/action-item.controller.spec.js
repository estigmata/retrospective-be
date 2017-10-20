'use strict';
const mockery = require('mockery');
let ActionItemController;

class ActionItemModelMock {
  static createActionItem () {}
  static deleteActionItem () {}
  static getActionItemsByQuery () {}
  static getActionItemById () {}
  static updateActionItem () {}
}

const res = {
  status () {
    return this;
  },
  send () {}
};

describe('Action Item controller', () => {
  beforeEach(() => {
    mockery.enable({
      warnOnReplace: false,
      warnOnUnregistered: false,
      useCleanCache: true
    });
    mockery.registerMock('./action-item.model', ActionItemModelMock);
    ActionItemController = require('./action-item.controller.js');
  });

  describe('Add new action item', () => {
    it('should return a action item summary and _id', done => {
      spyOn(res, 'status').and.callThrough();
      spyOn(res, 'send');
      spyOn(ActionItemModelMock, 'createActionItem').and.returnValue(
        Promise.resolve({
          _id: '59cc47301c319d178c5f4012',
          summary: 'new action item'
        })
      );

      const next = jasmine.createSpy('next');

      const req = {
        body: {
          summary: 'new action item'
        }
      };

      ActionItemController.addNewActionItem(req, res, next).
        then(() => {
          expect(ActionItemModelMock.createActionItem).toHaveBeenCalled();
          expect(res.send).toHaveBeenCalledWith({ data: {
            _id: '59cc47301c319d178c5f4012',
            summary: 'new action item'
          } });
          done();
        });
    });
  });

  describe('get a action item by id', () => {
    it('should return an action item summary and _id', done => {
      spyOn(res, 'status').and.callThrough();
      spyOn(res, 'send');
      spyOn(ActionItemModelMock, 'getActionItemById').and.returnValue(
        Promise.resolve({
          _id: '59cc47301c319d178c5f4012',
          summary: 'new action item'
        })
      );

      const next = jasmine.createSpy('next');

      const req = {
        params: {
          actionItemId: '59cc47301c319d178c5f4012'
        }
      };

      ActionItemController.getActionItem(req, res, next).
        then(() => {
          expect(ActionItemModelMock.getActionItemById).toHaveBeenCalled();
          expect(res.send).toHaveBeenCalledWith({ data: {
            _id: '59cc47301c319d178c5f4012',
            summary: 'new action item'
          } });
          done();
        });
    });
  });

  describe('get a action item by query params', () => {
    it('should return an or more action item with summary and _id', done => {
      spyOn(res, 'status').and.callThrough();
      spyOn(res, 'send');
      spyOn(ActionItemModelMock, 'getActionItemsByQuery').and.returnValue(
        Promise.resolve({
          _id: '59cc47301c319d178c5f4012',
          summary: 'new action item'
        })
      );

      const next = jasmine.createSpy('next');

      const req = {
        query: {
          _id: '59cc47301c319d178c5f4012'
        }
      };

      ActionItemController.getActionItems(req, res, next).
        then(() => {
          expect(ActionItemModelMock.getActionItemsByQuery).toHaveBeenCalled();
          expect(res.send).toHaveBeenCalledWith({ data: {
            _id: '59cc47301c319d178c5f4012',
            summary: 'new action item'
          } });
          done();
        });
    });
  });

  describe('delete a action item by id', () => {
    it('should return the old action item with summary and _id', done => {
      spyOn(res, 'status').and.callThrough();
      spyOn(res, 'send');
      spyOn(ActionItemModelMock, 'deleteActionItem').and.returnValue(
        Promise.resolve({
          _id: '59cc47301c319d178c5f4012',
          summary: 'new action item'
        })
      );

      const next = jasmine.createSpy('next');

      const req = {
        params: {
          actionItemId: '59cc47301c319d178c5f4012'
        }
      };

      ActionItemController.deleteActionItem(req, res, next).
        then(() => {
          expect(ActionItemModelMock.deleteActionItem).toHaveBeenCalled();
          expect(res.send).toHaveBeenCalledWith({ data: {
            _id: '59cc47301c319d178c5f4012',
            summary: 'new action item'
          } });
          done();
        });
    });
  });

  describe('update a action item by id', () => {
    it('should return the new action item with summary and _id', done => {
      spyOn(res, 'status').and.callThrough();
      spyOn(res, 'send');
      spyOn(ActionItemModelMock, 'updateActionItem').and.returnValue(
        Promise.resolve({
          _id: '59cc47301c319d178c5f4012',
          summary: 'new action item'
        })
      );

      const next = jasmine.createSpy('next');

      const req = {
        params: {
          actionItemId: '59cc47301c319d178c5f4012'
        },
        body: {
          summary: 'new action item'
        }
      };

      ActionItemController.updateActionItem(req, res, next).
        then(() => {
          expect(ActionItemModelMock.updateActionItem).toHaveBeenCalled();
          expect(res.send).toHaveBeenCalledWith({ data: {
            _id: '59cc47301c319d178c5f4012',
            summary: 'new action item'
          } });
          done();
        });
    });
  });
});
