'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

const config = require('../config');

/** Get this file's name for filtering */
const filename = path.basename(__filename);

/** Create the database object */
const database = {};

/** Override timezone formatting */
Sequelize.DATE.prototype._stringify = (date, options) => {
    date = this._applyTimezone(date, options);
  
    // Z here means current timezone, _not_ UTC
    // return date.format('YYYY-MM-DD HH:mm:ss.SSS Z');
    return date.format('YYYY-MM-DD HH:mm:ss.SSS');
};

/** Initialize Database connection */
let sequelize = new Sequelize(config.DATABASE);

/** Import other models */
fs.readdirSync(__dirname)
/** Ensure it is a javascript file and is not this file */
.filter(file => file !== filename && path.extname(file) === '.js')
/** Then import */
.forEach(file => {
    /** Create the model */
    const model = sequelize.import(path.join(__dirname, file));
    /** Add to database object */
    database[model.name] = model;
});

/** If the model can be associated, associate it */
Object.keys(database).forEach(modelName => {
    if(database[modelName].associate) {
        database[modelName].associate(database);
    }
});

/** Add sequelize and Sequelize to database object */
database.sequelize = sequelize;
database.Sequelize = Sequelize;

module.exports = database;