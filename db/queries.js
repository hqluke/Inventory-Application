const pool = require("./pool");

function capitalizeFirstLetter(string) {
    if (!string) return "";
    return string.charAt(0).toUpperCase() + string.slice(1);
}

async function getAllFood() {
    const { rows } = await pool.query("SELECT * FROM food");
    if (rows.length === 0) {
        console.log("No foods found.");
    } else {
        console.log("Foods found, displaying all.");
    }
    return rows;
}

async function createFood(name) {
    name = capitalizeFirstLetter(name);
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

async function getRemovableFoods() {
    const { rows } = await pool.query(`
        SELECT f.* 
        FROM food f
        LEFT JOIN person p ON f.name = p.favfood
        WHERE p.favfood IS NULL
    `);
    console.log("Found removable foods.");
    return rows;
}

async function removeFood(name) {
    console.log("Removing food.");
    const result = await pool.query("DELETE FROM food WHERE name = $1", [name]);
    if (result.rowCount === 0) {
        console.log("Food does not exist.");
    } else {
        console.log("Food removed.");
    }
    return result;
}

module.exports = {
    getAllFood,
    createFood,
    removeFood,
    getRemovableFoods,
};
