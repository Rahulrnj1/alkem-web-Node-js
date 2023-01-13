const mongoose = require('mongoose');

const adminSchema = mongoose.Schema({
    name: { type: String },
    email: { type: String, unique: true },
    password: { type: String },
    is_active: { type: Boolean, default: true },
    created_at: { type: Date, default: Date.now },
    is_delete: { type: Boolean, default: false },
    updated_at: { type: Date, default: Date.now },


}, {
    collection: "admin",
    versionKey: false
});

const Admin = mongoose.model("admin", adminSchema)
module.exports = Admin