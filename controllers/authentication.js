'use strict';

const uuidv4 = require('uuid/v4');
const models = require('../models');


/** Process the login */
const login = async (req, res, next) => {
    const { email, password, remember } = req.body;
    const { ip } = req;
    const userAgent = req.get('user-agent');

    /** If there are missing details */
    if(!email || !password) {
        res.locals.err = "MISSING_DETAILS";
        return next();
    }

    /** Find the user by email */
    const user = await models.User.findOne({
        where: {
            email: email
        }
    })
    .catch(err => {
        res.locals.err = err;
        return next();
    });

    /** If a user was not found */
    if(!user) {
        res.locals.err = "NO_USER";
        return next();
    }

    /** Check if the password is correct */
    const authenticated = user.validatePassword(password);

    /** If the password is not correct */
    if(!authenticated) {
        res.locals.err = "INCORRECT_PASSWORD";
        return next();
    }

    /** Create the expiry date of the session */
    const expires = new Date();

    /** If remember add 30 days to expiry */
    if(remember) {
        expires.setDate(expires.getDate() + 30);
    }
    else {
        expires.setDate(expires.getDate() + 1);
    }

    /** Create the new sessionId */
    const sessionId = uuidv4();

    /** Create a new session */
    const session = await models.User_Session.create({
        id: sessionId,
        user_id: user.id,
        ip_address: ip,
        user_agent: userAgent,
        expired: expires,
    })
    .catch(err => {
        console.log(err);
        res.locals.err = err;
        return next();
    });

    /** If the session was not created */
    if(!session) {
        res.locals.err = "FAILED_CREATION";
        return next();
    }

    console.log(session);

    /** Create the new cookie */
    const sessionOptions = {
        httpOnly: true,
        secure : null,
        expires: expires,
    };

    /** Attach the new cookies to the user */
    res.cookie('id', sessionId, sessionOptions);

    /** If the login is successful redirect to home */
    res.redirect('/');
}

exports.login = login;