const mongoose = require('mongoose');

const pledgeSchema = mongoose.Schema({
    doctor_name: { type: String },
    month: { type: String, required: true },
    target: { type: String, required: true },
    image:  { type: String, default: '' },
    status: { type: String, required: true },
    is_active: { type: Boolean, default: true },
    created_at: { type: Date, default: Date.now },
    is_delete: { type: Boolean, default: false },
    updated_at: { type: Date, default: Date.now },


}, {
    collection: "pledge",
    versionKey: false
});

const Pledge = mongoose.model('Pledge', pledgeSchema);

module.exports = Pledge;