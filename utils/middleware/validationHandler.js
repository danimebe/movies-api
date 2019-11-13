const boom = require('@hapi/boom');
const joi = require('@hapi/joi');

function validate(data, Schema) {
    const { error } = joi.validate(data, Schema);
    return error;
}

function validationHandler(Schema, check = "body") {
    return function (req, res, next) {
        const error = validate(req[check], Schema);
        
        error ? next(boom.badRequest(error)):next();
    }
}

module.exports = validationHandler;