'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const config = require('./config');
const routes = require('./routes');
const protect = require('./lib/protect');

const app = express();

/** Set the location of our template files */
app.set('views', './templates');
/** Set PugJS as our templating engine */
app.set('view engine', 'pug');

/** Allows JSON posts */
app.use(bodyParser.json());
/** Allows URL params */
app.use(bodyParser.urlencoded({ extended: false }));
/** Allow for cookies to be passed */
app.use(cookieParser());

/** Allow use of static files from the public folder */
app.use(express.static('./public'));

/** Protect routes */
app.use(protect);

/** Use our routes */
app.use(routes);

app.listen(config.DEV_PORT);