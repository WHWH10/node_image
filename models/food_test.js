const mongoose = require('mongoose');

const foodTestSchema = new mongoose.Schema({
    // foodId: { type: Number, required: true, unique: true },
    foodName: String,
    foodImageUrl: String,
    foodContent: String,
    foodPrice: String,
    foodTag: [String],
    foodRate: String,
    writenBy: String,
},
    {
        timestamps: true,
        versionKey: false
    });

module.exports = mongoose.model('FoodTest', foodTestSchema, 'foodTest');