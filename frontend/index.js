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
   .createServer(
      // Provide the private and public key to the server by reading each
      // file's content with the readFileSync() method.
      {
         key: fs.readFileSync("key.pem"),
         cert: fs.readFileSync("cert.pem"),
      },
      app
   )
   .listen(4000, () => {
      console.log("serever is runing at port 4000");
   });

app.use(express.static('public'));