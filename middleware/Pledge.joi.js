const Joi = require('joi');
const validateSchema = require("./validation")

const pledgeSchema = async (req, res, next) => {
    const Schema = Joi.object().keys({
        doctorid: Joi.string().required(),
        month: Joi.string().required(),
        target: Joi.string().required(),
        is_active: Joi.boolean(),
        is_delete: Joi.boolean(),
        created_at: Joi.date(),
        updated_at: Joi.date()
    })
    validateSchema(req, res, next, Schema);
}
const UpdatepledgeSchema = async (req, res, next) => {

    const schema = Joi.object({
        doctorid: Joi.string().required(),
        month: Joi.string().required(),
        target: Joi.string().required(),
        is_active: Joi.boolean(),
        is_delete: Joi.boolean(),
        created_at: Joi.date(),
        updated_at: Joi.date()


    });
    validateSchema(req, res, next, schema);

}
module.exports = { pledgeSchema, UpdatepledgeSchema }