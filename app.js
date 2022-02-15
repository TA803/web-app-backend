// importing modules
const express = require("express");
const app = express();
const cors = require("cors");
const MongoClient = require("mongodb").MongoClient;

//connects to mongoDB
let db;
MongoClient.connect("mongodb+srv://afterschlClub:AfterschlClub@cluster0.yboho.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", (err, client) => {
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

//Listening on port 3030
app.listen(3030);