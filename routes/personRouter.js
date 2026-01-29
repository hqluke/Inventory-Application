const express = require("express");
personController = require("../controllers/personController");
const personRouter = express.Router();

personRouter.get("/", personController.getPerson);

personRouter.get("/create", personController.getCreatePerson);
personRouter.post(
    "/create",
    personController.validatePerson,
    personController.validateHeight,
    personController.validateWeight,
    personController.postCreatePerson,
);

personRouter.get("/remove", personController.getRemovePerson);
personRouter.post("/remove", personController.postRemovePerson);
personRouter.post("/:id", personController.editPerson);

module.exports = personRouter;
