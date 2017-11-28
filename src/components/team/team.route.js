'use strict';
const express = require('express');
const TeamController = require('./team.controller');
const teamSchema = require('./team-schema');
const { validateSchema } = require('./../../middleware/schema-validation.middleware');

const router = express.Router();

router.post('/', validateSchema(teamSchema), TeamController.addNewTeam);
router.get('/', TeamController.getTeams);
router.get('/users', TeamController.getUserTeams);
router.put('/:teamId', validateSchema(teamSchema), TeamController.updateTeam);
router.get('/:teamId', TeamController.getTeam);
module.exports = router;
