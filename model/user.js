const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: { type: String, default: '' },
    email: { type: String, unique: true },
    employeeid: { type: String, unique: true },
    password: { type: String, default: '' },
    usertype: { type: String, default: '' },
    phonenumber: { type: String, default: '' },
    rmid: mongoose.Schema.Types.ObjectId,
    dsmid: mongoose.Schema.Types.ObjectId,
    smid: mongoose.Schema.Types.ObjectId,
    zone: { type: String, default: '' },
    division: { type: String, default: '' },
    state: { type: String, default: '' },
    is_active: { type: Boolean, default: true },
    created_at: { type: Date, default: Date.now },
    is_delete: { type: Boolean, default: false },
    updated_at: { type: Date, default: Date.now },



}, {
    collection: "user",
    versionKey: false
});

const User = mongoose.model("user", userSchema)
module.exports = User