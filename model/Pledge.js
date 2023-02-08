const mongoose = require('mongoose');

const pledgeSchema = mongoose.Schema({
    doctorid: mongoose.Schema.Types.ObjectId,
    month: { type: String, required: true },
    target: { type: String, required: true },
    image: { type: String, default: '' },
    rmid: mongoose.Schema.Types.ObjectId,
    dsmid: mongoose.Schema.Types.ObjectId,
    mrid: mongoose.Schema.Types.ObjectId,
    smid: mongoose.Schema.Types.ObjectId,
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