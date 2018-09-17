'use strict';

const models = require('../models');

const getQuestions = (req, res, next) => {
    models.Question.findAll({})
    .then(results => {
        res.locals.data.questions = results;
        return next();
    })
    .catch(err => {
        res.locals.err = err;
        return next();
    });
}

const create = async (req, res, next) => {
    const application = await models.Application.create({
        user_id: req.user.id,
        date_created: new Date(),
    })
    .catch(err => {
        res.locals.err = err;
        return next();
    })

    res.locals.data.application_id = application.id;
    return next();
};

const submit = async (req, res, next) => {
    const answers = req.body;
    const application_id = answers.application;

    delete answers.application;

    const application_answers = Object.keys(answers).map(answer_id => 
        models.Application_Answer.create({
            application_id: application_id,
            question_id: answer_id,
            answer: answers[answer_id],
        })
    );

    Promise.all([
        models.Application.update(
            { date_submitted: new Date() },
            { 
                where: {
                    id: application_id
                }
            }
        ),
        Promise.all(application_answers)
    ])
    .then(results => {
        return res.redirect('/');
    })
    .catch(err => {
        res.locals.err = err;
        return next();
    })
}

const get = (req, res, next) => {
    models.Application.findAll({
        include: [
            models.Application_Answer,
            models.User,
            models.Application_Status,
        ]
    })
    .then(results => {
        res.locals.data.applications = results;
        return next();
    })
    .catch(err => {
        res.locals.err = err;
        return next();
    })
}

const process = (req, res, next) => {
    const { approve, application_id } = req.body;

    models.Application.update({
        where: {
            id: application_id,
        },
        status: approve ? 4 : 3
    })
    .then(() => {
        res.status(200).send();
    })
    .catch(err => {
        res.status(400).send(err);
    })
}

exports.getQuestions = getQuestions;
exports.create = create;
exports.submit = submit;
exports.get = get;
exports.process = process;