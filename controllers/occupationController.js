const db = require("../db/queries");
const { body, validationResult, matchedData } = require("express-validator");

const lengthOneHundredErrorMessage =
    "Title must be between 1 and 100 characters";
const lengthTwoFiftyFiveErrorMessage =
    "Description must be between 1 and 255 characters";
const alphaErrorMessage = "Title must be only letters";

const validateTitle = [
    body("title")
        .trim()
        .isLength({ min: 1, max: 100 })
        .withMessage(lengthOneHundredErrorMessage)
        .isAlpha()
        .withMessage(alphaErrorMessage),
];

const validateDescription = [
    body("description")
        .trim()
        .isLength({ min: 1, max: 255 })
        .withMessage(lengthTwoFiftyFiveErrorMessage),
];

async function getOccupations(req, res) {
    console.log("-----Occupation Page-----");
    let successMessage = null;
    if (req.query.successAdd === "true") {
        successMessage = "Occupation added successfully!";
    } else if (req.query.successAdd === "false") {
        successMessage = "Occupation not added, it already exists!";
    }

    const occupations = await db.getAllOccupations();
    res.render("occupationView", { occupations, successMessage });
}

async function getCreateOccupation(req, res) {
    console.log("-----Create Occupation Page-----");
    const occupation = await db.getAllOccupations();
    res.render("createOccupation", {
        occupation: req.body,
        errors: null,
        title: "",
        description: "",
        startdate: "",
    });
}

async function postCreateOccupation(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.render("createOccupation", {
            errors: errors.array(),
            title: req.body.title,
            description: req.body.description,
            startdate: req.body.startdate,
        });
    }
    console.log("No errors found, creating occupation");

    const { title, description, startdate } = req.body;
    const result = await db.createOccupation(title, description, startdate);
    if (result.rowCount == 0) {
        res.redirect("/occupation?successAdd=false");
    } else {
        res.redirect("/occupation?successAdd=true");
    }
}

async function getRemoveOccupation(req, res) {
    console.log("-----Remove Occupation Page-----");
    const occupations = await db.getRemoveableOccupations();
    console.log("Occupations to show:");
    console.log(occupations);
    let successMessage = null;
    if (req.query.successRemove === "true") {
        successMessage = "Occupation removed successfully!";
    } else if (req.query.successRemove === "false") {
        successMessage = "Occupation does not exist!";
    }
    console.log("successMessage", successMessage);
    res.render("removeOccupation", {
        occupations,
        errors: null,
        successMessage,
    });
}

async function postRemoveOccupation(req, res) {
    const { title } = req.body;
    const result = await db.removeOccupation(title);
    if (result.rowCount === 0) {
        res.redirect("/occupation/remove?successRemove=false");
    } else {
        res.redirect("/occupation/remove?successRemove=true");
    }
}

module.exports = {
    getOccupations,
    getCreateOccupation,
    postCreateOccupation,
    getRemoveOccupation,
    postRemoveOccupation,
    validateTitle,
    validateDescription,
};
