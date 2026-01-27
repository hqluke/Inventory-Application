const express = require("express");
occupationcontroller = require("../controllers/occupationController");
const occupationRouter = express.Router();

occupationRouter.get("/", (req, res) => {
    console.log("----Occupation Page----");
    occupationcontroller.getAllOccupations(res);
});

module.exports = occupationRouter;
