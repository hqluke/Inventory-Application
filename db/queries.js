const pool = require("./pool");

async function getAllFood() {
    const { rows } = await pool.query("SELECT * FROM food");
    if (rows.length === 0) {
        console.log("No foods found.");
    }
    else{
        console.log("Foods found, displaying all.");
    }
    return rows;
}

async function createFood(name) {
    console.log("Creating food.");
    const result = await pool.query(
        "INSERT INTO food (name) VALUES ($1) ON CONFLICT (name) DO NOTHING",
        [name],
    );
    if (result.rowCount === 0) {
        console.log("Food already exists.");
    } else {
        console.log("Food created.");
    }
    return result;
}

module.exports = {
    getAllFood,
    createFood,
};
