const db = require("../db/queries.js");

async function getFood(req, res) {
    console.log("Calling database for food");
    const foods = await db.getAllFood();
    res.render("foodView", { foods });
}

async function postFood(req, res) {
    console.log("Creating food");
    const { name } = req.body;
    await db.createFood(name);
    res.redirect("/");
}

async function addFood(req, res) {
    console.log("Showing add food page");
    res.render("foodAdd");
}

module.exports = { getFood, postFood, addFood };
