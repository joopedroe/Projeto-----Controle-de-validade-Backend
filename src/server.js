const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const cors =require('cors');

const server = express();

mongoose.connect('mongodb+srv://joopedroe:92692012@cluster0-vqe16.mongodb.net/test?retryWrites=true&w=majority',{
    useNewUrlParser: true
});

server.use(cors());

server.use(express.json());
server.use(routes);
server.listen(process.env.PORT || 3333);