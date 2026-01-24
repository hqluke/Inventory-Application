const express = require("express");
const foodcontroller = require("../controllers/foodController");
const foodRouter = express.Router();

console.log("foodRouter");
foodRouter.get("/", foodcontroller.getFood);
foodRouter.get("/add", foodcontroller.addFood);
foodRouter.post("/add", foodcontroller.postFood);

module.exports = foodRouter;
