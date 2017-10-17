'use strict';
const express = require('express');
const StrategyController = require('./strategy-template.controller');
const strategySchema = require('./strategy-template-schema');
const { validateSchema } = require('./../../middleware/schema-validation.middleware');

const router = express.Router();

router.get('/', StrategyController.getStrategies);
router.get('/:strategyId', StrategyController.getOneStrategy);
router.post('/', validateSchema(strategySchema), StrategyController.addNewStrategy);

module.exports = router;
