const { IotDeviceAdvisor } = require('aws-sdk');
const express = require('express');
const router = express.Router();

const mongoose = require('mongodb')

const Food = require('../models/food')
const FoodTest = require('../models/food_test')

// food 전체 읽어오기 (내가 만든 것만)
router.get('/foods', (req, res) => {
    // res.end();
    Food.find((err, foods) => {
        if (err) return res.status(500).json({ errorCode: 400, errorMessage: err });
        res.json({ resultCode: 200, resultMessage: foods });
    })
})

// food 전체 읽어오기 (foods & foodTest)
router.get('/all-foods', (req, res) => {

    Food.find((err, foods) => {
        console.log('food ' + foods);
        if (err) return res.status(500).json({ errorCode: 400, errorMessage: err });
        return foods;
    }).then(foods => {
        FoodTest.find().then(function (foodTest) {
            var result = foods.concat(foodTest);
            res.json({
                resultCode: 200, resultMessage: result
            })
        })
    })
})

// 특정 food 읽어오기 
router.get('/foods/:food_id', (req, res) => {
    // res.end();
    Food.findOne({ _id: req.params.food_id }, function (err, food) {
        if (err) return res.status(500).json({ errorCode: 400, errorMessage: err });
        if (!food) return res.status(404).json({ errorCode: 400, error: err });
        res.json({ resultCode: 200, resultMessage: food });
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
    food.writtenBy = req.body.writtenBy;

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

// food 추가
router.post('/foods-test', (req, res) => {
    console.log(req.body);
    var food = new FoodTest();
    food.foodName = req.body.foodName;
    food.foodImageUrl = req.body.foodImageUrl;
    food.foodContent = req.body.foodContent;
    food.foodPrice = req.body.foodPrice;
    food.foodTag = req.body.foodTag;
    food.foodRate = req.body.foodRate;
    food.writenBy = req.body.writenBy;

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
        if (err) return res.status(500).json({ errorCode: 500, error: err });
        if (!food) return res.status(404).json({ errorCode: 404, error: err });

        if (req.body.foodName) food.foodName = req.body.foodName;
        if (req.body.foodImageUrl) food.foodImageUrl = req.body.foodImageUrl;
        if (req.body.foodContent) food.foodContent = req.body.foodContent;
        if (req.body.foodPrice) food.foodPrice = req.body.foodPrice;
        if (req.body.foodTag) food.foodTag = req.body.foodTag;
        if (req.body.writtenBy) food.writtenBy = req.body.writtenBy;

        food.save(function (err) {
            if (err) res.status(500).json({ errorCode: 400, error: err });
            res.json({ resultCode: 200, resultMessage: 'food updated' });
        });
    })
})

router.put("/foods2/:food_id", function (req, res) {
    Food.updateOne(
        { _id: req.params.food_id },
        { $set: req.body },
        function (err, output) {
            if (err) res.status(500).json({ errorCode: 500, error: err });
            console.log(output);

            if (!output.n) return res.status(404).json({ errorCode: 404, error: err });
            res.json({ message: "food updated" });
        }
    );
});

router.put("/foods3/", function (req, res) {
    Food.updateMany(
        {},
        { $set: req.body },
        function (err, output) {
            if (err) res.status(500).json({ errorCode: 500, error: err });
            console.log(output);

            if (!output.n) return res.status(404).json({ errorCode: 404, error: err });
            res.json({ message: "food updated" });
        }
    );
});

module.exports = router;