'use strict';
const mockery = require('mockery');
let StrategyModel;

class StrategyDbMock {
  static findById () {}
  static create () {}
  static find () {}
}

describe('Strategy Template Model', () => {
  beforeEach(() => {
    mockery.enable({
      warnOnReplace: false,
      warnOnUnregistered: false,
      useCleanCache: true
    });
    mockery.registerMock('./strategy-template.db', StrategyDbMock);
    StrategyModel = require('./strategy-template.model.js');
  });

  describe('Get one strategy by id from model', () => {
    it('should return a strategy', done => {
      spyOn(StrategyDbMock, 'findById').and.returnValue(
        Promise.resolve({
          '_id': '59cc47301c319d178c5f4012',
          'name': 'newstrategy'
        })
      );
      StrategyModel.getStrategyTemplate('59cc47301c319d178c5f4012').
        then(() => {
          expect(StrategyDbMock.findById).toHaveBeenCalled();
          done();
        });

    });

    it('should return a error title with error message whit incorrect _id', done => {
      spyOn(StrategyDbMock, 'findById').and.returnValue(
        Promise.resolve()
      );
      StrategyModel.getStrategyTemplate('incorrectId').
        catch(err => {
          expect(StrategyDbMock.findById).toHaveBeenCalled();
          expect(err.message).toEqual('The Strategy Template with that id does not exist');
          expect(err.title).toEqual('Strategy Template not found');
          expect(err.status).toEqual(404);
          done();
        });

    });
  });

  describe('Save a new strategy from model', () => {
    it('should return a new strategy', done => {
      spyOn(StrategyDbMock, 'create').and.returnValue(
        Promise.resolve({
          '__v': 0,
          'name': 'newstrategy1',
          '_id': '59cc47301c319d178c5f4012',
          'categories': []
        })
      );
      StrategyModel.createStategyTemplate({ 'name': 'newstrategy1' }).
        then(() => {
          expect(StrategyDbMock.create).toHaveBeenCalled();
          done();
        });
    });

    it('should return a error to try add new strategy', done => {
      spyOn(StrategyDbMock, 'create').and.returnValue(
        Promise.reject()
      );
      StrategyModel.createStategyTemplate({ 'name': 'newrestrospective' }).
        catch(err => {
          expect(StrategyDbMock.create).toHaveBeenCalled();
          expect(err.message).toEqual('Strategy template could not be saved');
          expect(err.title).toEqual('Internal server error');
          expect(err.status).toEqual(500);
          done();
        });
    });
  });

  describe('Get strategies by query params from model', () => {
    it('should return a array of strategies', done => {
      spyOn(StrategyDbMock, 'find').and.returnValue(
        Promise.resolve([
          {
            '_id': '59cece8ee3e0ec2eca0bfc17',
            'name': 'strategy1',
            'categories': []
          },
          {
            '_id': '59ceede60cfd4a3c089743bc',
            'name': 'strategy2',
            'categories': []
          },
          {
            '_id': '59d279c392f2112e903d22ab',
            'name': 'strategy3',
            'categories': [
              {
                'name': 'Well',
                '_id': '59d279c392f2112e903d22ad'
              },
              {
                'name': 'Bad',
                '_id': '59d279c392f2112e903d22ac'
              }
            ]
          }
        ])
      );
      StrategyModel.getStrategyTemplatesByQuery({}).
        then(() => {
          expect(StrategyDbMock.find).toHaveBeenCalled();
          done();
        });

    });
  });
});
