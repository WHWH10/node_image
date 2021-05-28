const mongoose = require('mongoose')

const etcIconSchema = new mongoose.Schema({
    etcIconName: String,
    etcIconImageUrl: String
}, {
    versionKey: false
});

module.exports = mongoose.model('EtcIcon', etcIconSchema);