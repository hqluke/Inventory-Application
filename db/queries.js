const pool = require("./pool");

async function getAllFood() {
    const { rows } = await pool.query("SELECT * FROM food");
    return rows;
}

module.exports = {
    getAllFood
};
