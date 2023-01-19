const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: { type: String },
    email: { type: String, unique: true },
    password: { type: String },
    usertype: { type: String },
    phonenumber: { type: String },
    userid: { type: mongoose.Schema.Types.ObjectId },
    zone: { type: String },
    division: { type: String },
    state: { type: String },
    is_active: { type: Boolean, default: true },
    created_at: { type: Date, default: Date.now },
    is_delete: { type: Boolean, default: false },
    updated_at: { type: Date, default: Date.now },
    employeeid: { type: String, unique: true },


}, {
    collection: "user",
    versionKey: false
});

const User = mongoose.model("user", userSchema)
module.exports = User