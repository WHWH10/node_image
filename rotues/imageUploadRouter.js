const express = require('express');
const router = express.Router();
const AWS = require('aws-sdk')
const uuid = require('uuid')
const multer = require('multer')

const CategoryIcon = require('../models/categoryIcon')
const EtcIcon = require('../models/etcIcons')

const s3 = new AWS.S3({
    endpoint: new AWS.Endpoint(process.env.AWS_END_POINT),
    region: 'kr-standard',
    credentials: {
        accessKeyId: process.env.AWS_ID,
        secretAccessKey: process.env.AWS_SECRET
    },
})

const storage = multer.memoryStorage({
    destination: function (req, file, callback) {
        callback(null, '')
    }
})

const upload = multer({ storage: storage }).single('image')

//image 업로드 :: illustrate
router.post('/upload', upload, (req, res) => {

    let myFileName = req.file.originalname.split(".")
    const fileType = myFileName[myFileName.length - 1]

    console.log(myFileName)
    console.log(req.file)
    // res.send({
    //     message: 'Upload Page'
    // })

    const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        // Key: 'image_6' + '.' + fileType,
        Key: myFileName[0] + '.' + fileType,
        Body: req.file.buffer,
    }

    s3.upload(params, (error, data) => {
        if (error) {
            res.status(500).send(error)
        }

        res.status(200).send(data)
    })
})

//image 업로드 :: icon
router.post('/upload-icon', upload, (req, res) => {

    let myFileName = req.file.originalname.split(".")
    const fileType = myFileName[myFileName.length - 1]

    console.log(myFileName)
    console.log(req.file)
    // res.send({
    //     message: 'Upload Page'
    // })

    const params = {
        Bucket: process.env.AWS_BUCKET_ICON,
        // Key: 'image_6' + '.' + fileType,
        Key: myFileName[0] + '.' + fileType,
        Body: req.file.buffer,
    }

    s3.upload(params, (error, data) => {
        if (error) {
            res.status(500).send(error)
        }

        res.status(200).send(data)
    })
})


// image 업로드 :: image-test
router.post('/upload_test', upload, (req, res) => {

    let myFileName = req.file.originalname.split(".")
    const fileType = myFileName[myFileName.length - 1]

    console.log(myFileName)
    console.log(req.file)
    // res.send({
    //     message: 'Upload Page'
    // })

    const params = {
        Bucket: process.env.AWS_BUCKET_NAME_TEST,
        // Key: 'image_6' + '.' + fileType,
        Key: myFileName[0] + '.' + fileType,
        Body: req.file.buffer,
    }

    s3.upload(params, (error, data) => {
        if (error) {
            res.status(500).send(error)
        }

        res.status(200).send(data)
    })
})

// CategoryIcon 전체 읽어오기 
router.get('/icons/category', (req, res) => {
    CategoryIcon.find((err, icons) => {
        if (err) return res.status(500).send({ errorCode: 500, errorMessage: 'databse failure' });
        res.json(icons);
    })
})

// CategoryIcon 추가하기
router.post('/icons/category', (req, res) => {
    var categoryIcon = new CategoryIcon();
    categoryIcon.categoryIconName = req.body.categoryIconName;
    categoryIcon.categoryIconImageUrl = req.body.categoryIconImageUrl;

    categoryIcon.save((err) => {
        if(err) {
            console.error(err);
            res.json({
                errorCode: 400,
                errorMessage: err
            })
            return;
        } 
        res.json({
            resultCode: 200,
            resultMessage: categoryIcon
        })
    })
})

// EtcICon 전체 읽어오기 
router.get('/icons/etc', (req, res) => {
    EtcIcon.find((err, icons) => {
        if (err) return res.status(500).send({ errorCode: 500, errorMessage: 'databse failure' });
        res.json(icons);
    })
})

// CategoryIcon 추가하기
router.post('/icons/etc', (req, res) => {
    var etcIcon = new EtcIcon();
    etcIcon.etcIconName = req.body.etcIconName;
    etcIcon.etcIconImageUrl = req.body.etcIconImageUrl;

    etcIcon.save((err) => {
        if(err) {
            console.error(err);
            res.json({
                errorCode: 400,
                errorMessage: err
            })
            return;
        } 
        res.json({
            resultCode: 200,
            resultMessage: etcIcon
        })
    })
})


module.exports = router;