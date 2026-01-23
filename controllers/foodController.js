const db = require("../db/queries.js");

async function getFood(req, res) {
    console.log("Calling database for food");
    const foods = await db.getAllFood();
    res.render("foodView", { foods });
}

module.exports = { getFood };
