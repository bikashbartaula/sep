'use strict';

const express = require('express');

const controllers = require('../controllers');
const serve = require('../lib/serve');

const router = express.Router();

/** New Application */
router.route('/new')
    .get(
        controllers.application.getQuestions,
        controllers.application.create,
        serve('application')
    )
    .post(
        controllers.application.submit,
        controllers.application.getQuestions,
        serve('application')
    )

/** Process */
router.route('/process')
    .get(
        controllers.application.process
    )

module.exports = router;