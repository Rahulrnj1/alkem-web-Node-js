const Joi = require('joi');
const validateSchema = require("./validation")

const doctorAssignSchema = async (req, res, next) => {
    const Schema = Joi.object().keys({
        doctorid: Joi.array().items(Joi.string()).required(),
        mrid: Joi.string().required(),
        is_active: Joi.boolean(),
        is_delete: Joi.boolean(),
        created_at: Joi.date(),
        updated_at: Joi.date()
    })
    validateSchema(req, res, next, Schema);
}
module.exports = { doctorAssignSchema }