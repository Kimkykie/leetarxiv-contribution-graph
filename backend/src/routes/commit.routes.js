// src/routes/commit.routes.js
const express = require('express');
const router = express.Router();
const commitController = require('../controllers/commit.controller');

router.post('/UpdateCommits', commitController.updateCommits);
router.get('/RetrieveCommits', commitController.retrieveCommits);

module.exports = router;