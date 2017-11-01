'use strict';
const express = require('express');
const ItemController = require('./item.controller');
const itemSchema = require('./../item/item-schema');
const { validateSchema } = require('./../../middleware/schema-validation.middleware');

const router = express.Router();

router.get('/', ItemController.getItems);
router.get('/:retrospectiveId/:userId', ItemController.getItemsWithRatesByUser);
router.post('/', validateSchema(itemSchema), ItemController.newItem);
router.delete('/:itemId', ItemController.deleteItem);
router.put('/:itemId/rates/:userId', ItemController.updateItemRate);
router.put('/:itemId', validateSchema(itemSchema), ItemController.updateItem);

router.get('/rates', ItemController.getRatesItemByUser);
router.put('/:itemId/rates', ItemController.updateItemRateByUser);

module.exports = router;
