'use strict';
const express = require('express');
const ItemController = require('./item.controller');
const itemSchema = require('./../item/item-schema');
const { validateSchema } = require('./../../middleware/schema-validation.middleware');

const router = express.Router();

router.get('/', ItemController.getItems);
router.delete('/:itemId', ItemController.deleteItem);
router.put('/:itemId/rates/:userId', ItemController.updateItemRate);
router.put('/:itemId', validateSchema(itemSchema), ItemController.updateItem);

module.exports = router;
