const mongoose = require('mongoose');

const doctorassignSchema = mongoose.Schema({
    doctorid: mongoose.Schema.Types.ObjectId,
    rmid: mongoose.Schema.Types.ObjectId,
    dsmid: mongoose.Schema.Types.ObjectId,
    mrid: mongoose.Schema.Types.ObjectId,
    smid: mongoose.Schema.Types.ObjectId,
    is_active: { type: Boolean, default: true },
    created_at: { type: Date, default: Date.now },
    is_delete: { type: Boolean, default: false },
    updated_at: { type: Date, default: Date.now },

}, {
    collection: "DoctorAssign",
    versionKey: false
});

const DoctorAssign = mongoose.model("DoctorAssign", doctorassignSchema)
module.exports = DoctorAssign 