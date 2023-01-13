const Joi = require('joi');
const validateSchema = require("./validation")

const userSchema = async (req, res, next) => {
    const Schema = Joi.object().keys({
        name: Joi.string().trim().min(3).max(30).required(),
        email: Joi.string().min(5).max(255).required().email(),
        employeeid: Joi.string().required(),
        phonenumber: Joi.string().required(),
        division: Joi.string().required(),
        division: Joi.string().required(),
        zone: Joi.string().required(),
        state: Joi.string().required(),
        password: Joi.string().min(6).max(60).pattern(new RegExp('^[a-zA-Z0-9]{6,30}$')).messages({ 'string.pattern.base': `password number must have 6 digits.` }).required(),
        usertype: Joi.string(),
        is_active: Joi.boolean(),
        is_delete: Joi.boolean(),
        created_at: Joi.date(),
        updated_at: Joi.date()
    })
    validateSchema(req, res, next, Schema);
}
const Updateuserschema = async (req, res, next) => {

    const schema = Joi.object({
        name: Joi.string().trim().min(3).max(30).required(),
        email: Joi.string().min(5).max(255).required().email(),
        employeeid: Joi.string().required(),
        phonenumber: Joi.string().required(),
        division: Joi.string().required(),
        division: Joi.string().required(),
        zone: Joi.string().required(),
        state: Joi.string().required(),
        password: Joi.string().min(6).max(60).pattern(new RegExp('^[a-zA-Z0-9]{6,30}$')).messages({ 'string.pattern.base': `password number must have 6 digits.` }).required(),
        usertype: Joi.string(),
        is_active: Joi.boolean(),
        is_delete: Joi.boolean(),
        created_at: Joi.date(),
        updated_at: Joi.date()


    });
    validateSchema(req, res, next, schema);

}

module.exports = { userSchema, Updateuserschema }