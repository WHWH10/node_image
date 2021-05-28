const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
    // foodId: { type: Number, required: true, unique: true },
    foodName: String,
    foodImageUrl: String,
    foodContent: String,
    foodPrice: String,
    foodTag: [String],
    foodRate: String,
    writtenBy: String,
},
    {
        timestamps: true,
        versionKey: false
    });

module.exports = mongoose.model('Food', foodSchema);