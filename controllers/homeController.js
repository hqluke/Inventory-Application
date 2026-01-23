const db = require("../db/queries");

async function homeDefault(req, res) {
    res.render("homeView");
}
module.exports = { homeDefault };
