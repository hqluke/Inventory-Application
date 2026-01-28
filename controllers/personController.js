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

async function getCreatePerson(req, res) {
    console.log("-----Create Person Page-----");
    const foods = await db.getAllFood();
    const occupations = await db.getAllOccupations();
    res.render("personCreate", {
        occupations,
        foods,
        errors: null,
        name: "",
        height: "",
        weight: "",
    });
}

async function postCreatePerson(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.render("personCreate.ejs", {
            errors: errors.array(),
            name: req.body.name,
            height: req.body.height,
            weight: req.body.weight,
            occupations: await db.getAllOccupations(),
            foods: await db.getAllFood(),
        });
    }
    console.log("No errors found, creating person");
    const { name, height, weight, job, favfood } = req.body;
    const rowcount = await db.createPerson(name, height, weight, favfood, job);
    console.log("return person rowcount", rowcount);
    if (rowcount.rowCount == 0) {
        res.redirect("/person?successAdd=false");
    } else {
        res.redirect("/person?successAdd=true");
    }
}

async function getRemovePerson(req, res) {
    console.log("-----Remove Person Page-----");
    const people = await db.getAllPerson();
    let successMessage = null;
    if (req.query.successRemove === "true") {
        successMessage = "Person removed successfully!";
    } else if (req.query.successRemove === "false") {
        successMessage = "Person does not exist!";
    }

    res.render("personRemove", { people, successMessage, errors: null });
}

async function postRemovePerson(req, res) {
    const { personId } = req.body;
    console.log("Id:", personId);
    const rowcount = await db.removePerson(personId);
    console.log("return person rowcount", rowcount);
    if (rowcount.rowCount == 0) {
        res.redirect("/person/remove?successRemove=false");
    } else {
        res.redirect("/person/remove?successRemove=true");
    }
}

module.exports = {
    getPerson,
    validatePerson,
    validateHeight,
    validateWeight,
    getCreatePerson,
    postCreatePerson,
    getRemovePerson,
    postRemovePerson,
};
