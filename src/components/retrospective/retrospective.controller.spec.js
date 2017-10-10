'use strict';
const mockery = require('mockery');
let RetrospectiveController;

class RetrospectiveModelMock {
  static getRetrospective () {}
  static createRetrospective () {}
  static getRetrospectiveByQuery () {}
}

const res = {
  status () {},
  send () {}
};

describe('Retrospective controller', () => {
  beforeEach(() => {
    mockery.enable({
      warnOnReplace: false,
      warnOnUnregistered: false,
      useCleanCache: true
    });
    mockery.registerMock('./retrospective.model', RetrospectiveModelMock);
    RetrospectiveController = require('./retrospective.controller');
  });

  describe('Get one retrospective by id controller', () => {
    it('should return one retrospective', done => {
      spyOn(res, 'status').and.callThrough();
      spyOn(res, 'send');
      const mockCategory = {
        '_id': '59cd373ef3ad86072d718a35',
        'name': 'newrestrospective2'
      };
      spyOn(RetrospectiveModelMock, 'getRetrospective').and.returnValue(
        Promise.resolve(mockCategory)
      );

      const next = jasmine.createSpy('next');

      const req = { params: { retroId: '59cd373ef3ad86072d718a35' } };
      RetrospectiveController.getOneRetrospective(req, res, next).
        then(() => {
          expect(RetrospectiveModelMock.getRetrospective).toHaveBeenCalled();
          expect(res.send).toHaveBeenCalledWith({ data: {
            '_id': '59cd373ef3ad86072d718a35',
            'name': 'newrestrospective2'
          } });
          done();
        });
    });
  });

  describe('Post a new retrospective controller', () => {
    it('should return the new retrospective', done => {
      spyOn(res, 'status').and.callThrough();
      spyOn(res, 'send');
      const mockCategory = {
        '__v': 0,
        'name': 'newrestrospective2',
        '_id': '59cd373ef3ad86072d718a35',
        'categories': []
      };
      spyOn(RetrospectiveModelMock, 'createRetrospective').and.returnValue(
        Promise.resolve(mockCategory)
      );

      const next = jasmine.createSpy('next');

      const req = { body: { name: 'newrestrospective2' } };
      RetrospectiveController.addNewRetrospective(
        req,
        res,
        next).
        then(() => {
          expect(RetrospectiveModelMock.createRetrospective).toHaveBeenCalled();
          expect(res.send).toHaveBeenCalledWith({ data: {
            '__v': 0,
            'name': 'newrestrospective2',
            '_id': '59cd373ef3ad86072d718a35',
            'categories': []
          } });
          done();
        });
    });
  });

  describe('Get retrospectives by query params controller', () => {
    it('should return a array of retrospectives', done => {
      spyOn(res, 'status').and.callThrough();
      spyOn(res, 'send');
      const mockCategory = [{
        '__v': 0,
        'name': 'newrestrospective2',
        '_id': '59cd373ef3ad86072d718a35',
        'categories': []
      }];
      spyOn(RetrospectiveModelMock, 'getRetrospectiveByQuery').and.returnValue(
        Promise.resolve(mockCategory)
      );

      const next = jasmine.createSpy('next');
      const req = { query: { name: 'newrestrospective3' } };
      RetrospectiveController.getRetrospectives(req, res, next).
        then(() => {
          expect(RetrospectiveModelMock.getRetrospectiveByQuery).toHaveBeenCalled();
          expect(res.send).toHaveBeenCalledWith({ data: [{
            '__v': 0,
            'name': 'newrestrospective2',
            '_id': '59cd373ef3ad86072d718a35',
            'categories': []
          } ] });
          done();
        });
    });
  });
});
