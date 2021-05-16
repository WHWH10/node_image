const express = require('express');
const router = express.Router();
const Food = require('../models/food')

// food 전체 읽어오기 
router.get('/foods', (req, res) => {
    // res.end();
    Food.find((err, foods) => {
        if (err) return res.status(500).send({ errorCode: 500, errorMessage: 'databse failure' });
        res.json(foods);
    })
})

// 특정 food 읽어오기 
router.get('/foods/:food_id', (req, res) => {
    // res.end();
    Food.findOne({_id: req.params.food_id}, function(err, food){
        if(err) return res.status(500).json({error: err});
        if(!food) return res.status(404).json({error: 'food not found'});
        res.json(food);
    })
})

// food 추가
router.post('/foods', (req, res) => {
    console.log(req.body);
    var food = new Food();
    food.foodName = req.body.foodName;
    food.foodImageUrl = req.body.foodImageUrl;
    food.foodContent = req.body.foodContent;
    food.foodPrice = req.body.foodPrice;
    food.foodTag = req.body.foodTag;
    food.foodRate = req.body.foodRate;

    food.save((err) => {
        if (err) {
            console.error(err);
            res.json({
                erroCode: 400,
                errorMessage: err
            })
            return;
        }
        res.json({
            resultCode: 200,
            resultMessage: food
        })
    })
})

router.put('/foods/:food_id', (req, res) => {
    Food.findById(req.params.food_id, (err, food) => {
        if (err) return res.status(500).json({ error: 'database failure' });
        if (!food) return res.status(404).json({ error: 'food not found' });

        if (req.body.foodName) food.foodName = req.body.foodName;
        if (req.body.foodImageUrl) food.foodImageUrl = req.body.foodImageUrl;
        if (req.body.foodContent) food.foodContent = req.body.foodContent;
        if (req.body.foodPrice) food.foodPrice = req.body.foodPrice;
        if (req.body.foodTag) food.foodTag = req.body.foodTag;

        food.save(function (err) {
            if (err) res.status(500).json({ error: 'failed to update' });
            res.json({ message: 'food updated' });
        });
    })
})

router.put("/foods2/:food_id", function (req, res) {
    Food.updateOne(
        { _id: req.params.food_id },
        { $set: req.body },
        function (err, output) {
            if (err) res.status(500).json({ error: "database failure" });
            console.log(output);

            if (!output.n) return res.status(404).json({ error: "food not found" });
            res.json({ message: "food updated" });
        }
    );
});

module.exports = router;