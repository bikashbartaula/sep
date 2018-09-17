'use strict';

const fs = require('fs');
const path = require('path');
const express = require('express');
const router = express.Router();

/** Get the name of this file for filtering */
const filename = path.basename(__filename);

/** Get all files in this directory */
fs.readdirSync(__dirname)
/** Filter out this current file and ensure only requireing javascript files */
.filter(file => file !== filename && path.extname(file) === '.js')
/** Export each route */
.forEach(route => {
    /** Create the routename */
    const pathName = `/${path.basename(route, '.js')}`;
    /** Export the route */
    router.use(pathName, require(path.join(__dirname, route)));
});

module.exports = router;