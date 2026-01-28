const express = require("express");
personController = require("../controllers/personController");
const personRouter = express.Router();

personRouter.get("/", personController.getPerson);


module.exports = personRouter;
