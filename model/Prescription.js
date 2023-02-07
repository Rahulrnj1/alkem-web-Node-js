const { string } = require('joi');
const mongoose = require('mongoose');
const Schema = require('mongoose').Schema;

const prescriptionSchema = mongoose.Schema({
    doctorid: mongoose.Schema.Types.ObjectId,
    month: { type: String },
    brand: { type: String, default: " " },
    rmid: mongoose.Schema.Types.ObjectId,
    dsmid: mongoose.Schema.Types.ObjectId,
    mrid: mongoose.Schema.Types.ObjectId,
    smid: mongoose.Schema.Types.ObjectId,
    numberOfRXs: { type: Number, default: "0" },
    status: { type: String, required: true },
    totalValue: { type: Number, default: "0" }
}, {
    collection: "Prescription",
    versionKey: false
});

const Prescription = mongoose.model('Prescription', prescriptionSchema);

module.exports = Prescription;
