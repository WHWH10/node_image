require('dotenv/config')
const express = require('express');
const multer = require('multer')
const mongoose = require('mongoose');

const AWS = require('aws-sdk')
const uuid = require('uuid')

const path = require('path')

const app = express()
// const hostname = process.env.NAVER_CLOUT_HOST
const port = process.env.PORT || 3000;

const Food = require('./models/food')
const foodRouter = require('./rotues/foodRouter')

const imageUploadRouter = require('./rotues/imageUploadRouter')

// app.use(express.static(path.join(__dirname, 'views')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set('view engine', 'ejs');

app.use('/api', foodRouter)
app.use('/image', imageUploadRouter)
// const router = require('./rotues/index')(express.Router(), Food);
// app.use('/api', router)
// var foodRouter = require('./rotues/index');
// app.use('views', __dirname + '/views');


mongoose
    .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Successfully connexted to mongodb'))
    .catch(e => console.log(e));

// const s3 = new AWS.S3({
//     endpoint: new AWS.Endpoint(process.env.AWS_END_POINT),
//     region: 'kr-standard',
//     credentials: {
//         accessKeyId: process.env.AWS_ID,
//         secretAccessKey: process.env.AWS_SECRET
//     },
// })

// const storage = multer.memoryStorage({
//     destination: function (req, file, callback) {
//         callback(null, '')
//     }
// })

// const upload = multer({ storage: storage }).single('image')

app.get('/', (req, res) => {
    res.render('pages/index')
    // res.send({
    //     message: 'Main Page'
    // })
})

app.get('/hello', (req, res) => {
	res.send('ok hello')
})

app.get('/requirement', (req, res) => {
    roes.render('pages/requirement')
})

app.get('/api-docs', (req, res) => {
    res.render('pages/api.ejs')
})

// app.post('/upload', upload, (req, res) => {

//     let myFileName = req.file.originalname.split(".")
//     const fileType = myFileName[myFileName.length - 1]

//     console.log(myFileName)
//     console.log(req.file)
//     // res.send({
//     //     message: 'Upload Page'
//     // })

//     const params = {
//         Bucket: process.env.AWS_BUCKET_NAME,
//         // Key: 'image_6' + '.' + fileType,
//         Key: myFileName[0] + '.' + fileType,
//         Body: req.file.buffer,
//     }

//     s3.upload(params, (error, data) => {
//         if (error) {
//             res.status(500).send(error)
//         }

//         res.status(200).send(data)
//     })
// })


// app.post('/upload_test', upload, (req, res) => {

//     let myFileName = req.file.originalname.split(".")
//     const fileType = myFileName[myFileName.length - 1]

//     console.log(myFileName)
//     console.log(req.file)
//     // res.send({
//     //     message: 'Upload Page'
//     // })

//     const params = {
//         Bucket: process.env.AWS_BUCKET_NAME_TEST,
//         // Key: 'image_6' + '.' + fileType,
//         Key: myFileName[0] + '.' + fileType,
//         Body: req.file.buffer,
//     }

//     s3.upload(params, (error, data) => {
//         if (error) {
//             res.status(500).send(error)
//         }

//         res.status(200).send(data)
//     })
// })

app.listen(port,  () => {
    console.log('Server is up at ' + port);
})
