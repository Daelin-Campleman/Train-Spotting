require("dotenv").config();
const express = require("express");
const passport = require("passport");
const session = require("express-session");
require("./passport");

const app = express();
const port = process.env.PORT || 8080;
const path = require("path");

// app.use(express.static("public"));

// express session
app.use(
  session({
    secret: process.env.secret,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Middleware used in protected routes to check if the user has been authenticated
const isLoggedIn = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.redirect("/login");
  }
};

// Base route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public/login/login.html"));
});

app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "public/login/login.html"));
});

// Google Auth consent screen route
app.get(
  "/google",
  passport.authenticate("google", {
    scope: ["email", "profile"],
  })
);

// Call back route
app.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/failed",
  }),
  function (req, res) {
    res.redirect("/home");
  }
);

// failed route if the authentication fails
app.get("/failed", (req, res) => {
  console.log("User is not authenticated");
  res.redirect("/login?error=Login%20failed!%20Please%20try%20again");
});

// Success route if the authentication is successful
app.get("/home", isLoggedIn, (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

// Route that logs out the authenticated user
app.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log("Error while destroying session:", err);
    } else {
      req.logout(() => {
        console.log("You are logged out");
        res.redirect("/");
      });
    }
  });
});

const userRouter = require("./routes/user");
const landingRouter = require("./routes/landing");

app.engine('html', require('ejs').renderFile);
app.set("views", path.join(__dirname, "views"));
app.use("/static", express.static("./public"));
app.use("/game", userRouter);


app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});