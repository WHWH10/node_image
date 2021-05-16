// const express = require('express');
// const router = express.Router();

// // food 전체 읽어오기 
// router.get('/foods', (req, res) => {
//     // res.end();

//     res.send({
//         message: 'Main Page'
//     })
// })

// // 특정 food 읽어오기 
// router.get('/foods/:food_id', (req, res) => {
//     res.end();
// })

// // food 추가
// router.post('/foods', (req, res) => {
//     var food = new Food();
//     food.foodName = req.body.foodName;
//     food.foodImageUrl = req.body.foodImageUrl;
//     food.foodContent = req.body.foodContent;
//     food.foodPrice = req.body.foodPrice;
//     food.foodTag = req.body.foodTag;
//     food.foodRate = req.body.foodRate;

//     food.save((err) => {
//         if (err) {
//             console.error(err);
//             res.json({
//                 erroCode: 400,
//                 errorMessage: err
//             })
//             return;
//         }
//         res.json({
//             resultCode: 200,
//             resultMessage: food
//         })
//     })
// })

// module.exports = router;

module.exports = function (app, Food) {
    // food 전체 읽어오기 
    app.get('/foods', (req, res) => {
        // res.end();

        res.send({
            message: 'Main Page'
        })
    })

    // 특정 food 읽어오기 
    app.get('/foods/:food_id', (req, res) => {
        res.end();
    })

    // food 추가
    app.post('/foods', (req, res) => {
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
}