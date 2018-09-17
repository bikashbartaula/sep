'use strict';

const config = require('../config');
const models = require('../models');

const guardian = async (req, res, next) => {
    /** Add the config */
    res.locals.config = Object.assign({}, config.SITE);
    /** Create the local data object*/
    res.locals.data = {};

    /** Redirect to home */
    if(req.path === '/') return res.redirect('/home');
    /** If the user is trying to login, but already logged in */
    if(req.path === '/authentication/login' && req.cookies.id) return res.redirect('/');
    /** If the user is trying to login, let them proceed */
    if(req.path === '/authentication/login') return next();
    /** If the user has no cookies, they need to login first */
    if(!req.cookies) return res.redirect('/authentication/login');

    /** Get the sessionId from cookies */
    const { id } = req.cookies;

    /** If there wasn't a cookie */
    if(!id) return res.redirect('/authentication/login');

    /** Get that session by id */
    const session = await models.User_Session.findOne({
        where: {
            id: id
        }
    })
    .catch(err => {
        /** If there was an error return to the login page */
        /** Clear the cookie */
        res.clearCookie('id');
        return res.redirect('/authentication/login');
    });

    /** If no session found */
    if(!session) {
        res.clearCookie('id');
        return res.redirect('/authentication/login');
    }

    /** Attach to local storage */
    req.session = session;

    /** Get the user from the session */
    const user = await session.getUser()
    .catch(err => {
        /** If there was an error return to the login page */
        /** Clear the cookie */
        res.clearCookie('id');
        return res.redirect('/authentication/login');
    });

    const role = await models.User_Role.findOne({
        where: {
            user_id: user.id
        },
        include: [
            models.Role
        ]
    })
    .catch(err => {
        console.log(err);
        res.clearCookie('id');
        return res.redirect('/authentication/login');
    })

    /** Attach to local storage */
    const userJSON = user.toJSON();
    userJSON.role = role.Role;

    //console.log(userJSON);

    req.user = userJSON;
    res.locals.user = userJSON;
    
    return next();
}

module.exports = guardian;