const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let bookSchema = new Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    summary: { type: String, default: "" },
    // category: {type: String, required: false},
    active: { type: Boolean, required: false, default: true },
    deleted: { type: Boolean, required: false, default: false },
}, {
    timestamps: true, versionKey: false
});

// Export the model
module.exports = mongoose.model('book', bookSchema, 'book')