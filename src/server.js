const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');

const server = express();

mongoose.connect('mongodb+srv://joopedroe:92692012@cluster0-vqe16.mongodb.net/test?retryWrites=true&w=majority',{
    useNewUrlParser: true
});

server.use(function(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.setHeader("Access-Control-All-Credentials",true);
    next();
});

server.use(express.json());
server.use(routes);
server.listen(3333);