'use strict';
const mockery = require('mockery');
let ItemController;

class RetrospectiveModelMock {
  static getRetrospective () {}
}

class ItemModelMock {
  static createItem () {}
  static deleteItem () {}
}

const res = {
  status () {
    return this;
  },
  send () {}
};

describe('Item controller', () => {
  beforeEach(() => {
    mockery.enable({
      warnOnReplace: false,
      warnOnUnregistered: false,
      useCleanCache: true
    });
    mockery.registerMock('../retrospective/retrospective.model', RetrospectiveModelMock);
    mockery.registerMock('./item.model', ItemModelMock);
    ItemController = require('./item.controller');
  });

  describe('Create item', () => {
    it('Should create item and return it', done => {
      spyOn(res, 'status').and.callThrough();
      spyOn(res, 'send');
      const mockItem = {
        _id: '59ce814f2dc23b48e181ddd9',
        retrospective: '59ce7c44534d95403f1ded42',
        category: '59ce7c44534d95403f1ded44',
        summary: 'standarts code',
        childs: []
      };
      spyOn(ItemModelMock, 'createItem').and.returnValue(
        Promise.resolve(mockItem)
      );

      const next = jasmine.createSpy('next');

      const req = {
        params: {
          retrospectiveId: '59ce7c44534d95403f1ded42'
        },
        body: {
          category: '59ce7c44534d95403f1ded44',
          summary: 'standarts code'
        }
      };

      ItemController.addNewItem(req, res, next).
        then(() => {
          expect(ItemModelMock.createItem).toHaveBeenCalled();
          expect(res.send).toHaveBeenCalledWith({ data: mockItem });
          done();
        });
    });

    it('Should fail with an internal server error when trying to create item', done => {
      spyOn(ItemModelMock, 'createItem').and.returnValue(Promise.reject({ status: 500 }));
      spyOn(res, 'send');
      const next = jasmine.createSpy('next');

      const req = {
        params: {
          retrospectiveId: '59ce7c44534d95403f1ded42'
        },
        body: {
          category: '59ce7c44534d95403f1ded44',
          summary: 'standarts code'
        }
      };

      ItemController.addNewItem(req, res, next)
        .then(() => {
          expect(ItemModelMock.createItem).toHaveBeenCalled();
          expect(next).toHaveBeenCalledWith({
            status: 500
          });
          done();
        });
    });
  });

  describe('Delete item', () => {
    it('Should delete item and return it', done => {
      spyOn(res, 'status').and.callThrough();
      spyOn(res, 'send');
      const mockItem = {
        _id: '59ce814f2dc23b48e181ddd9',
        retrospective: '59ce7c44534d95403f1ded42',
        category: '59ce7c44534d95403f1ded44',
        summary: 'standarts code',
        childs: []
      };
      spyOn(ItemModelMock, 'deleteItem').and.returnValue(
        Promise.resolve(mockItem)
      );

      const next = jasmine.createSpy('next');

      const req = {
        params: {
          itemId: '59ce814f2dc23b48e181ddd9'
        }
      };

      ItemController.deleteItem(req, res, next).
        then(() => {
          expect(ItemModelMock.deleteItem).toHaveBeenCalled();
          expect(res.send).toHaveBeenCalledWith({ data: mockItem });
          done();
        });
    });

    it('Should fail with an internal item not found when trying to delete item', done => {
      spyOn(res, 'status').and.callThrough();
      spyOn(res, 'send');
      spyOn(ItemModelMock, 'deleteItem').and.returnValue(
        Promise.resolve(null)
      );

      const next = jasmine.createSpy('next');

      const req = {
        params: {
          itemId: '59ce814f2dc23b48e181ddd9'
        }
      };

      ItemController.deleteItem(req, res, next).
        then(() => {
          expect(ItemModelMock.deleteItem).toHaveBeenCalled();
          expect(next).toHaveBeenCalled();
          done();
        });
    });

    it('Should fail with an internal server error when trying to delete item', done => {
      spyOn(ItemModelMock, 'deleteItem').and.returnValue(Promise.reject({ status: 500 }));
      spyOn(res, 'send');
      const next = jasmine.createSpy('next');

      const req = {
        params: {
          itemId: '59ce814f2dc23b48e181ddd9'
        }
      };

      ItemController.deleteItem(req, res, next)
        .then(() => {
          expect(ItemModelMock.deleteItem).toHaveBeenCalled();
          expect(next).toHaveBeenCalledWith({
            status: 500
          });
          done();
        });
    });
  });

});
