'use strict';

const Item = require('./../components/item/item.db');
const Retrospective =  require('./../components/retrospective/retrospective.db');

function allowOperateOverItem (...steps) {
  return function (req, res, next) {
    Item.findById(req.params.itemId).
      then(item => {
        return Retrospective.findById(item.retrospective).
          then(retrospective => {
            const isValidStep = steps.includes(retrospective.currentStep);

            if (!isValidStep) {
              return res.status(400).send({ error: 'Forbidden action' });
            }

            return next();
          });
      });
  };
}

function allowCreateItem (...steps) {
  return function (req, res, next) {
    Retrospective.findById(req.body.retrospective).
      then(retrospective => {
        const isValidStep = steps.includes(retrospective.currentStep);

        if (!isValidStep) {
          return res.status(400).send({ error: 'Forbidden action' });
        }

        return next();
      });
  };
}

function validateStepsWith (validateFunction) {
  const args = Array.prototype.splice.call(arguments, 1);

  return validateFunction(...args);
}

exports.allowOperateOverItem = allowOperateOverItem;
exports.allowCreateItem = allowCreateItem;
exports.validateStepsWith = validateStepsWith;
