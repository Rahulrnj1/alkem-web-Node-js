const Joi = require('joi');
const validateSchema = require("./validation")

const doctorSchema = async (req, res, next) => {
    const Schema = Joi.object().keys({
        doctor_name: Joi.string().trim().min(3).max(30).required(),
        phone_number: Joi.string().length(10).pattern(/^[0-9]+$/).required(),
        speciality: Joi.string().required(),
        hospital: Joi.string().required(),
        designation: Joi.string().required(),
        additional_qualification: Joi.string().required(),
        headquarters: Joi.string().required(),
        // doctor_image: Joi.string().required(),
        garnet_no: Joi.string().required(),
        pincode: Joi.string().required(),
        is_active: Joi.boolean(),
        is_delete: Joi.boolean(),
        created_at: Joi.date(),
        updated_at: Joi.date()
    })
    validateSchema(req, res, next, Schema);
}
module.exports = { doctorSchema }