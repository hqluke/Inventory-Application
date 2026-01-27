require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

const homeRouter = require("./routes/homeRouter");
const foodRouter = require("./routes/foodRouter");
const occupationRouter = require("./routes/occupationRouter");

const path = require("path");
const ejs = require("ejs");

//for styling
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use("/", homeRouter);
app.use("/food", foodRouter);
app.use("/occupation", occupationRouter);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`);
});
