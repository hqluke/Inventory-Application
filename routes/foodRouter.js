const express = require("express");
const foodcontroller = require("../controllers/foodController");
const foodRouter = express.Router();

console.log("foodRouter");
foodRouter.get("/", foodcontroller.getFood);

module.exports = foodRouter;
