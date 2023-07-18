var express = require('express');
var app = express();

app.use(express.static('public'));

var server = app.listen(8080, function () {
   var host = server.address().address
   var port = server.address().port

   console.log("Frontend listening at http://%s:%s", host, port)
})

const https = require("https");
const fs = request("fs");

const express = require("express");

const app = express();

https
   .createServer(app)
   .listen(8080, () => {
      console.log('server is runing at port 8080')
   });

app.use(express.static('public'));