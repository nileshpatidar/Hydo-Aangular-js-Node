var express = require('express');
var path = require("path");
var app = express();
var bodyParser = require("body-parser");
var http = require('http');
var router = require('./api/userapi')
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/mydb', { useNewUrlParser: true });
var mongoose = require('mongoose');  
var db = mongoose.connection;


app.use(express.static(path.join(__dirname , '/')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', router);
app.get("*" ,function(req,res){
   
    res.sendFile(path.join(__dirname,'/views/index.html'));

})

app.listen(8080);
console.log("server in 8080");