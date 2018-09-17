'use strict';

module.exports = page => {
    return (req, res, next) => {
        /** Render the page */
        res.render(page, {});
    }
}