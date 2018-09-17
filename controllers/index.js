'use strict';

const fs = require('fs');
const path = require('path');

/** Get the name of this file for filtering */
const filename = path.basename(__filename);

/** Get all files in this directory */
fs.readdirSync(__dirname)
/** Filter out this current file and ensure only requireing javascript files */
.filter(file => file !== filename && path.extname(file) === '.js')
/** Export each route */
.forEach(controller => {
    /** Create the routename */
    const controllerName = path.basename(controller, '.js');
    exports[controllerName] = require(path.join(__dirname, controller));
});