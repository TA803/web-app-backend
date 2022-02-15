// importing modules
const express = require("express");
const app = express();
const cors = require("cors");
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectId;


//connects to mongoDB
let db;
MongoClient.connect(process.env.databaseURL, (err, client) => {
    db = client.db("AfterSchoolClub")
})

// allows cross origin requests
app.use(cors());

//loads images from folder
app.use(express.static("images"))

// logging
app.use(function(request, response, next) {
    console.log("In comes a " + request.method + " to " + request.url);
    next();
});

// Request Handlers
app.get('/', (req, res) => {
    res.send("OK");
});


app.get('/collection/lessons', (req, res, next) => { // connects to the lessons in database
    db.collection('lessons').find({}).toArray((e, results) => { //gets all lessons from database
        if (e) return next(e) // error handling
        res.send(results) // output results
    })
})

//adds into order database
app.post('/collection/orders', (req, res, next) => {
    db.collection('orders').insert(req.body, (e, results) => {
        if (e) return next(e)
        res.send(results)
    })
})


//updates lessons space
app.put('/collection/lessons/:id', (req, res, next) => {
    db.collection('lessons').update({ _id: new ObjectId(req.params.id) }, { $set: req.body.space }, { safe: true, multi: false },
        (e, result) => {
            if (e) return next(e)
            res.send((result.result.n === 1) ? { msg: 'success' } : { msg: 'error' })
        })
})


//Listening on port 
app.listen(process.env.PORT || 3030);