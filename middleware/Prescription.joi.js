const Joi = require('joi');
const validateSchema = require("./validation")

const prescriptionSchema = async (req, res, next) => {
    const Schema = Joi.object().keys({
        doctorid: Joi.string().required(),
        month: Joi.string().required(),
        brand: Joi.string().required(),
        numberOfRXs: Joi.number().required(),
        totalValue: Joi.number().required(),
        is_active: Joi.boolean(),
        is_delete: Joi.boolean(),
        created_at: Joi.date(),
        updated_at: Joi.date()
    })
    validateSchema(req, res, next, Schema);
}


module.exports = { prescriptionSchema }