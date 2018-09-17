'use strict';

const express = require('express');

const controllers = require('../controllers');
const serve = require('../lib/serve');

const router = express.Router();

/** Login Pages */
router.route('/login')
    .get(
        serve('login')
    ) 
    .post(
        controllers.authentication.login,
        serve('login')
    )

module.exports = router;