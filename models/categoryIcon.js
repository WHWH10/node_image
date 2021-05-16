const mongoose = require('mongoose')

const categoryIconSchema = new mongoose.Schema({
    categoryIconName: String,
    categoryIconImageUrl: String
}, {
    versionKey: false
});

module.exports = mongoose.model('CategoryIcon', categoryIconSchema);