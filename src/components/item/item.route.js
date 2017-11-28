'use strict';
const express = require('express');
const ItemController = require('./item.controller');
const itemSchema = require('./../item/item-schema');
const { validateSchema } = require('./../../middleware/schema-validation.middleware');
const { allowOperateOverItem } = require('./../../middleware/step-validation.middleware');
const { allowCreateItem } = require('./../../middleware/step-validation.middleware');
const { validateStepsWith } = require('./../../middleware/step-validation.middleware');

const router = express.Router();

router.get('/', ItemController.getItems);
router.post('/',
  validateStepsWith(allowCreateItem, 'add-items', 'group-items'),
  validateSchema(itemSchema), ItemController.newItem);
router.delete('/:itemId',
  validateStepsWith(allowOperateOverItem, 'add-items', 'group-items'),
  ItemController.deleteItem);
router.put('/:itemId',
  validateStepsWith(allowOperateOverItem, 'add-items', 'group-items'),
  validateSchema(itemSchema), ItemController.updateItem);
router.get('/rates', ItemController.getRatesItemByUser);
router.put('/:itemId/rates',
  validateStepsWith(allowOperateOverItem, 'vote-items'), ItemController.updateItemRateByUser);

module.exports = router;
