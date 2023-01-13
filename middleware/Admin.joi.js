const Joi = require('joi');
const validateSchema = require("./validation")
const adminRegisterSchema = async (req, res, next) => {
    const Schema = Joi.object().keys({
        name: Joi.string().trim().min(3).max(30).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(6).max(60).pattern(new RegExp('^[a-zA-Z0-9]{6,30}$')).messages({ 'string.pattern.base': `password number must have 6 digits.` }).required(),
        is_active: Joi.boolean(),
        is_delete: Joi.boolean(),
        created_at: Joi.date(),
        updated_at: Joi.date()
    })
    validateSchema(req, res, next, Schema);
}
const adminLoginSchema = async (req, res, next) => {
    const Schema = Joi.object().keys({

        email: Joi.string().required(),
        password: Joi.string().min(6).max(60).required(),

    })
    validateSchema(req, res, next, Schema);
}



module.exports = { adminRegisterSchema, adminLoginSchema }