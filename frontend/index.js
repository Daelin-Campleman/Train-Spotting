const express = require('express')
const app = express()
const port = 8080
const path = require("path");

const userRouter = require("./routes/user");
const landingRouter = require("./routes/landing");

app.engine('html', require('ejs').renderFile);
app.set("views", path.join(__dirname, "views"));
app.use("/static", express.static("./public"));

app.use("/", landingRouter);
app.use("/login", userRouter);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})