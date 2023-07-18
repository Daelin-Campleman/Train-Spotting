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