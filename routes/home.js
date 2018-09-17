'use strict';

const express = require('express');

const controllers = require('../controllers');
const serve = require('../lib/serve');

const router = express.Router();

/** Home Pages */
router.route('/')
    .get(
        controllers.application.get,
        serve('index')
    );

module.exports = router;