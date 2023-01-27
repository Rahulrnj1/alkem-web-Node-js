const mongoose = require('mongoose');

const doctorSchema = mongoose.Schema({
    doctor_name: { type: String },
    doctor_image: { type: String, default: '' },
    phone_number: { type: String, set: function (value) { return value.replace(/^(0|\+91)/, "") } },
    speciality: { type: String, default: '' },
    address: { type: String },
    hospital: { type: String, default: '' },
    designation: { type: String, default: '' },
    additional_qualification: { type: String },
    state: { type: String },
    pincode: { type: String },
    action: { type: String },
    garnet_no: { type: String },
    is_active: { type: Boolean, default: true },
    created_at: { type: Date, default: Date.now },
    is_delete: { type: Boolean, default: false },
    updated_at: { type: Date, default: Date.now },



}, {
    collection: "doctor",
    versionKey: false
});

const Doctor = mongoose.model("doctor", doctorSchema)
module.exports = Doctor 