const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const expressLayouts = require("express-ejs-layouts");
const expressSession = require("express-session");
const connectFlash = require("connect-flash");

require("dotenv").config();

//MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(expressLayouts);
app.set("layout", "frontend/layout");

//VIEW ENGINE
app.set("view engine", "ejs");

//DATABASE CONNECTION
mongoose.connect(process.env.MONGODB_URI);

app.use(
  expressSession({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  }),
);

app.use(connectFlash());

//Routes
app.use("/", require("./routes/frontend"));

// Admin layout Routes
app.use("/admin", (req, res, next) => {
  res.locals.layout = "admin/layout";
  next();
});

// Admin Routes
app.use("/admin", require("./routes/admin"));

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
