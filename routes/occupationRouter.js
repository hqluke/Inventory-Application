const express = require("express");
occupationController = require("../controllers/occupationController");
const occupationRouter = express.Router();

occupationRouter.get("/", occupationController.getOccupations);

occupationRouter.get("/create", occupationController.getCreateOccupation);
occupationRouter.post(
    "/create",
    occupationController.validateTitle,
    occupationController.validateDescription,
    occupationController.postCreateOccupation,
);

occupationRouter.get("/remove", occupationController.getRemoveOccupation);
occupationRouter.post("/remove", occupationController.postRemoveOccupation);

module.exports = occupationRouter;
