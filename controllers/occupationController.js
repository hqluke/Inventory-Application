const db = require("../db/queries");

async function getAllOccupations(res) {
    const occupations = await db.getAllOccupations();
    res.render("occupationView", { occupations });
}

module.exports = {
    getAllOccupations,
};
