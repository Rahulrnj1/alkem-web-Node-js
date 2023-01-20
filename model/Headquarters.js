const mongoose = require('mongoose');

const headquartersSchema = mongoose.Schema({
    headquartersName: { type: String },
    is_active: { type: Boolean, default: true },
    created_at: { type: Date, default: Date.now },
    is_delete: { type: Boolean, default: false },
    updated_at: { type: Date, default: Date.now },


}, {
    collection: "headquarters",
    versionKey: false
});

const Headquarters = mongoose.model("headquarters", headquartersSchema)
module.exports = Headquarters