const db = require("../db/queries.js");
const { body, validationResult, matchedData } = require("express-validator");

const lengthErrorMessage = "Name must be between 1 and 20 characters";
const alphaErrorMessage = "Name must be only letters";
const validateFood = [
    body("name")
        .trim()
        .isLength({ min: 1, max: 20 })
        .withMessage(lengthErrorMessage)
        .isAlpha()
        .withMessage(alphaErrorMessage),
];

async function getFood(req, res) {
    console.log("------Food Page-----");
    console.log("Calling database for food");
    const foods = await db.getAllFood();
    let successMessage = null;
    if (req.query.successAdd === "true") {
        successMessage = "Food added successfully!";
    } else if (req.query.successAdd === "false") {
        successMessage = "Food not added, it already exists!";
    } else if (req.query.successRemove === "true") {
        successMessage = "Food removed successfully!";
    } else if (req.query.successRemove === "false") {
        successMessage = "Food does not exist!";
    }

    res.render("foodView", { foods, successMessage });
}
async function postFood(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.render("foodAdd", {
            errors: errors.array(),
            name: req.body.name,
        });
    }
    console.log("No errors found, creating food");
    const { name } = req.body;
    const rowcount = await db.createFood(name);
    console.log("rowcount", rowcount);
    if (rowcount.rowCount == 0) {
        res.redirect("/food?successAdd=false");
    } else {
        res.redirect("/food?successAdd=true");
    }
}

async function addFood(req, res) {
    console.log("------Add Food Page-----");
    res.render("foodAdd", { errors: null, name: "" });
}

async function postRemove(req, res) {
    const { name } = req.body;
    console.log(`Food to remove: ${name}`);
    const rowcount = await db.removeFood(name);
    console.log("rowcount", rowcount);
    if (rowcount.rowCount === 0) {
        res.redirect("/food?successRemove=false");
    } else {
        res.redirect("/food?successRemove=true");
    }
}

async function getRemove(req, res) {
    console.log("------Remove Food Page-----");
    const foods = await db.getRemovableFoods();
    if (foods.length === 0) {
        return res.render("foodRemove", {
            errors: [
                {
                    msg: "No foods available to remove. All foods are assigned to people.",
                },
            ],
            foods: [],
        });
    }
    res.render("foodRemove", { errors: null, foods });
}

module.exports = {
    getFood,
    postFood,
    addFood,
    validateFood,
    postRemove,
    getRemove,
};
