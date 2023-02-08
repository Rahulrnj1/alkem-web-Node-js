const mongoose = require('mongoose');

const mrdoctorpledgeSchema = mongoose.Schema({
    doctorid: mongoose.Schema.Types.ObjectId,
    mrid: mongoose.Schema.Types.ObjectId,
    is_active: { type: Boolean, default: true },
    created_at: { type: Date, default: Date.now },
    is_delete: { type: Boolean, default: false },
    updated_at: { type: Date, default: Date.now },

}, {
    collection: "MRDoctorPledge",
    versionKey: false
});

const MRDoctorPledge = mongoose.model("MRDoctorPledge", mrdoctorpledgeSchema)
module.exports = MRDoctorPledge 