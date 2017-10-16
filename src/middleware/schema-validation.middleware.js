'use strict';

const tv4 = require('tv4');

function validateSchema (schema) {
  return function (req, res, next) {
    const result = tv4.validateResult(req.body, schema);
    if (!result.valid) {
      return res.status(400).send({ error: result.error.message });
    }
    return next();
  };
}

exports.validateSchema = validateSchema;
