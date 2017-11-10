'use strict';
const mockery = require('mockery');
let ActionItemModel;

class ActionItemDbMock {
  static findById () {}
  static create () {}
  static find () {}
  static populate () {}
  static findByIdAndRemove () {}
  static findByIdAndUpdate () {}
}

describe('Action Item Model', () => {
  beforeEach(() => {
    mockery.enable({
      warnOnReplace: false,
      warnOnUnregistered: false,
      useCleanCache: true
    });
    mockery.registerMock('./action-item.db', ActionItemDbMock);
    ActionItemModel = require('./action-item.model.js');
  });

  describe('Get one action item by id model', () => {
    it('should return a action item summary and _id', done => {
      spyOn(ActionItemDbMock, 'findById').and.returnValue(
        Promise.resolve({
          _id: '59cc47301c319d178c5f4012',
          summary: 'new action item'
        })
      );
      ActionItemModel.getActionItemById('59cc47301c319d178c5f4012').
        then(() => {
          expect(ActionItemDbMock.findById).toHaveBeenCalled();
          done();
        });
    });

    it('should return a error title with error message whit incorrect _id', done => {
      spyOn(ActionItemDbMock, 'findById').and.returnValue(
        Promise.resolve()
      );
      ActionItemModel.getActionItemById('incorrectId').
        catch(err => {
          expect(ActionItemDbMock.findById).toHaveBeenCalled();
          expect(err.message).toEqual('The action item with that id does not exist');
          expect(err.title).toEqual('Action item not found');
          expect(err.status).toEqual(404);
          done();
        });
    });
  });

  describe('Sace a new action item', () => {
    it('should return a new action item', done => {
      spyOn(ActionItemDbMock, 'create').and.returnValue(
        Promise.resolve({
          '__v': 0,
          'summary': 'new action item2',
          'itemId': '59db9ef859f1f84ff9559130',
          'retrospectiveId': '59d9023f545ab819c4303459',
          '_id': '59df869570b8dc7b6cdf8ec3'
        })
      );
      ActionItemModel.createActionItem({
        'summary': 'new action item2',
        'itemId': '59db9ef859f1f84ff9559130',
        'retrospectiveId': '59d9023f545ab819c4303459' }).
        then(() => {
          expect(ActionItemDbMock.create).toHaveBeenCalled();
          done();
        });
    });
    it('Shold return a error to try save a new action item', done => {
      spyOn(ActionItemDbMock, 'create').and.returnValue(
        Promise.reject()
      );
      ActionItemModel.createActionItem({
        'summary': 'new action item2',
        'itemId': '59db9ef859f1f84ff9559130',
        'retrospectiveId': '59d9023f545ab819c4303459' }).
        catch(err => {
          expect(ActionItemDbMock.create).toHaveBeenCalled();
          expect(err.message).toEqual('Action item could not be saved');
          expect(err.title).toEqual('Internal server error');
          done();
        });
    });
  });

  describe('Get a removed action item', () => {
    it('should return a copy of action item removed', done => {
      spyOn(ActionItemDbMock, 'findByIdAndRemove').and.returnValue(
        Promise.resolve({
          _id: '59cc47301c319d178c5f4012',
          summary: 'old action item'
        })
      );
      ActionItemModel.deleteActionItem('59cc47301c319d178c5f4012').
        then(() => {
          expect(ActionItemDbMock.findByIdAndRemove).toHaveBeenCalled();
          done();
        });
    });

    it('should return a error title with error message whit incorrect _id', done => {
      spyOn(ActionItemDbMock, 'findByIdAndRemove').and.returnValue(
        Promise.resolve()
      );
      ActionItemModel.deleteActionItem('incorrectId').
        catch(err => {
          expect(ActionItemDbMock.findByIdAndRemove).toHaveBeenCalled();
          expect(err.message).toEqual('Action item could not be deleted');
          expect(err.title).toEqual('Action item not found');
          expect(err.status).toEqual(404);
          done();
        });
    });
  });

  describe('Get a updated action item', () => {
    it('should return a new of action item', done => {
      spyOn(ActionItemDbMock, 'findByIdAndUpdate').and.returnValue(
        Promise.resolve({
          _id: '59cc47301c319d178c5f4012',
          summary: 'updated action item'
        })
      );
      ActionItemModel.updateActionItem('59cc47301c319d178c5f4012', {
        _id: '59cc47301c319d178c5f4012',
        summary: 'updated action item'
      }).
        then(() => {
          expect(ActionItemDbMock.findByIdAndUpdate).toHaveBeenCalled();
          done();
        });
    });

    it('should return a error title with error message whit incorrect _id', done => {
      spyOn(ActionItemDbMock, 'findByIdAndUpdate').and.returnValue(
        Promise.resolve()
      );
      ActionItemModel.updateActionItem('incorrectId', {
        _id: '59cc47301c319d178c5f4012',
        summary: 'updated action item'
      }).
        catch(err => {
          expect(ActionItemDbMock.findByIdAndUpdate).toHaveBeenCalled();
          expect(err.message).toEqual('Action item could not be updated');
          expect(err.title).toEqual('Action item not found');
          expect(err.status).toEqual(404);
          done();
        });
    });
  });

  describe('Get Retrospectives called by query params', () => {
    it('should return a retrospective with the _id = 59cc47301c319d178c5f4012', done => {
      spyOn(ActionItemDbMock, 'find').and.returnValue(ActionItemDbMock);
      spyOn(ActionItemDbMock, 'populate').and.returnValue(
        Promise.resolve({
          _id: '59cc47301c319d178c5f4012',
          summary: 'updated action item'
        })
      );
      ActionItemModel.getActionItemsByQuery({ _id: '59cc47301c319d178c5f4012' }).
        then(() => {
          expect(ActionItemDbMock.find).toHaveBeenCalled();
          done();
        });
    });
  });

});
