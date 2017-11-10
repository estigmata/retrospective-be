'use strict';
const mockery = require('mockery');
let RetrospectiveModel;

class RetrospectiveDbMock {
  static findById () {}
  static create () {}
  static find () {}
}

describe('Retrospective Model', () => {
  beforeEach(() => {
    mockery.enable({
      warnOnReplace: false,
      warnOnUnregistered: false,
      useCleanCache: true
    });
    mockery.registerMock('./retrospective.db', RetrospectiveDbMock);
    RetrospectiveModel = require('./retrospective.model.js');
  });

  describe('Get one retrospective by id model', () => {
    it('should return a retrospective name and _id', done => {
      spyOn(RetrospectiveDbMock, 'findById').and.returnValue(
        Promise.resolve({
          '_id': '59cc47301c319d178c5f4012',
          'name': 'newrestrospective'
        })
      );
      RetrospectiveModel.getRetrospective('59cc47301c319d178c5f4012').
        then(() => {
          expect(RetrospectiveDbMock.findById).toHaveBeenCalled();
          done();
        });

    });
    it('should return a error title with error message whit incorrect _id', done => {
      spyOn(RetrospectiveDbMock, 'findById').and.returnValue(
        Promise.resolve()
      );
      RetrospectiveModel.getRetrospective('incorrectId').
        catch(err => {
          expect(RetrospectiveDbMock.findById).toHaveBeenCalled();
          expect(err.message).toEqual('The retrospective with that id does not exist');
          expect(err.title).toEqual('Retrospective not found');
          expect(err.status).toEqual(404);
          done();
        });

    });
  });

  describe('Save a new retrospective', () => {
    it('should return a new retrospective', done => {
      spyOn(RetrospectiveDbMock, 'create').and.returnValue(
        Promise.resolve({
          '__v': 0,
          'name': 'newrestrospective',
          '_id': '59cc47301c319d178c5f4012',
          'categories': []
        })
      );
      RetrospectiveModel.createRetrospective({ 'name': 'newrestrospective' }).
        then(() => {
          expect(RetrospectiveDbMock.create).toHaveBeenCalled();
          done();
        });
    });
    it('should return a error to try add new retrospective', done => {
      spyOn(RetrospectiveDbMock, 'create').and.returnValue(
        Promise.reject()
      );
      RetrospectiveModel.createRetrospective({ 'name': 'newrestrospective' }).
        catch(err => {
          expect(RetrospectiveDbMock.create).toHaveBeenCalled();
          expect(err.message).toEqual('Could not save');
          expect(err.title).toEqual('Internal server error');
          expect(err.status).toEqual(500);
          done();
        });
    });
  });

  describe('Get retrospectives by query params', () => {
    it('should return a array of retrospectives', done => {
      spyOn(RetrospectiveDbMock, 'find').and.returnValue(
        Promise.resolve([
          {
            '_id': '59cece8ee3e0ec2eca0bfc17',
            'name': 'newrestrospective3',
            'categories': []
          },
          {
            '_id': '59ceede60cfd4a3c089743bc',
            'name': 'newrestrospective3',
            'categories': []
          },
          {
            '_id': '59d279c392f2112e903d22ab',
            'name': 'newrestrospective3',
            'categories': [
              {
                'name': 'Well Gabo',
                '_id': '59d279c392f2112e903d22ad'
              },
              {
                'name': 'Bad Gabo',
                '_id': '59d279c392f2112e903d22ac'
              }
            ]
          }
        ])
      );
      RetrospectiveModel.getRetrospectiveByQuery({}).
        then(() => {
          expect(RetrospectiveDbMock.find).toHaveBeenCalled();
          done();
        });

    });

    it('should return a error title with error message', done => {
      const error = new Error('The retrospectives with those params do not exist');
      error.title = 'Retrospective not found';
      spyOn(RetrospectiveDbMock, 'find').and.returnValue(
        Promise.reject(error)
      );
      RetrospectiveModel.getRetrospectiveByQuery({ _id: '59cd078e9ea150295094935a' }).
        then(() => {}).
        catch(err => {
          expect(RetrospectiveDbMock.find).toHaveBeenCalled();
          expect(err.message).toEqual('The retrospectives with those params do not exist');
          expect(err.title).toEqual('Retrospective not found');
          done();
        });
    });
  });
});
