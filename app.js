// importing modules
const express = require("express");
const app = express();
const cors = require("cors");
const MongoClient = require("mongodb").MongoClient;

// allows cross origin requests
app.use(cors());

// logging
app.use(function(request, response, next) {
    console.log("In comes a " + request.method + " to " + request.url);
    next();
});