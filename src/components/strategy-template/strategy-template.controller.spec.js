'use strict';
const mockery = require('mockery');
let StrategyTemplateController;

class StrategyModelMock {
  static getStrategyTemplate () {}
  static createStategyTemplate () {}
  static getStrategyTemplatesByQuery () {}
}

const res = {
  status () {},
  send () {}
};

describe('Strategy Template controller', () => {
  beforeEach(() => {
    mockery.enable({
      warnOnReplace: false,
      warnOnUnregistered: false,
      useCleanCache: true
    });
    mockery.registerMock('./strategy-template.model', StrategyModelMock);
    StrategyTemplateController = require('./strategy-template.controller');
  });

  describe('Get one strategy by id from controller', () => {
    it('should return one strategy', done => {
      spyOn(res, 'status').and.callThrough();
      spyOn(res, 'send');
      const mockCategory = {
        '_id': '59cd373ef3ad86072d718a35',
        'name': 'strategy1'
      };
      spyOn(StrategyModelMock, 'getStrategyTemplate').and.returnValue(
        Promise.resolve(mockCategory)
      );

      const next = jasmine.createSpy('next');

      const req = { params: { retroId: '59cd373ef3ad86072d718a35' } };
      StrategyTemplateController.getOneStrategy(req, res, next).
        then(() => {
          expect(StrategyModelMock.getStrategyTemplate).toHaveBeenCalled();
          expect(res.send).toHaveBeenCalledWith({ data: {
            '_id': '59cd373ef3ad86072d718a35',
            'name': 'strategy1'
          } });
          done();
        });
    });
  });

  describe('Post a new strategy from controller', () => {
    it('should return the new strategy', done => {
      spyOn(res, 'status').and.callThrough();
      spyOn(res, 'send');
      const mockCategory = {
        '__v': 0,
        'name': 'strategy2',
        '_id': '59cd373ef3ad86072d718a35',
        'categories': []
      };
      spyOn(StrategyModelMock, 'createStategyTemplate').and.returnValue(
        Promise.resolve(mockCategory)
      );

      const next = jasmine.createSpy('next');

      const req = { body: { name: 'strategy2' } };
      StrategyTemplateController.addNewStrategy(
        req,
        res,
        next).
        then(() => {
          expect(StrategyModelMock.createStategyTemplate).toHaveBeenCalled();
          expect(res.send).toHaveBeenCalledWith({ data: {
            '__v': 0,
            'name': 'strategy2',
            '_id': '59cd373ef3ad86072d718a35',
            'categories': []
          } });
          done();
        });
    });
  });

  describe('Get strategy by query params from controller', () => {
    it('should return an array of strategies', done => {
      spyOn(res, 'status').and.callThrough();
      spyOn(res, 'send');
      const mockCategory = [{
        '__v': 0,
        'name': 'strategy3',
        '_id': '59cd373ef3ad86072d718a35',
        'categories': []
      }];
      spyOn(StrategyModelMock, 'getStrategyTemplatesByQuery').and.returnValue(
        Promise.resolve(mockCategory)
      );

      const next = jasmine.createSpy('next');
      const req = { query: { name: 'strategy3' } };
      StrategyTemplateController.getStrategies(req, res, next).
        then(() => {
          expect(StrategyModelMock.getStrategyTemplatesByQuery).toHaveBeenCalled();
          expect(res.send).toHaveBeenCalledWith({ data: [{
            '__v': 0,
            'name': 'strategy3',
            '_id': '59cd373ef3ad86072d718a35',
            'categories': []
          } ] });
          done();
        });
    });
  });
});
