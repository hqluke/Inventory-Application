const db = require("../db/queries");
const { body, validationResult, matchedData } = require("express-validator");

const nameLengthOneHundredErrorMessage =
    "Name must be between 1 and 100 characters";
const heightErrorMessage = "Height must be 2 characters";
const weightErrorMessage = "Weight must be 2-3 characters";
const alphaErrorMessage = "Name must be only letters";

const validatePerson = [
    body("name")
        .trim()
        .isLength({ min: 1, max: 100 })
        .withMessage(nameLengthOneHundredErrorMessage)
        .isAlpha()
        .withMessage(alphaErrorMessage),
];

const validateHeight = [
    body("height")
        .trim()
        .isLength({ min: 2, max: 3 })
        .withMessage(heightErrorMessage),
];

const validateWeight = [
    body("weight")
        .trim()
        .isLength({ min: 2, max: 3 })
        .withMessage(weightErrorMessage),
];

async function getPerson(req, res) {
    console.log("-----Person Page-----");
    const person = await db.getAllPerson();
    let successMessage = null;
    if (req.query.successAdd === "true") {
        successMessage = "Person added successfully!";
    } else if (req.query.successAdd === "false") {
        successMessage = "Person not added, it already exists!";
    } else if (req.query.successRemove === "true") {
        successMessage = "Person removed successfully!";
    } else if (req.query.successRemove === "false") {
        successMessage = "Person does not exist!";
    }

    res.render("personView", { person, successMessage });
}

module.exports = {
    getPerson,
    validatePerson,
    validateHeight,
    validateWeight,
};
