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
        console.log(rows);
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

async function getAllOccupations() {
    console.log("Calling database for occupations");
    const { rows } = await pool.query("SELECT * FROM occupation");
    if (rows.length === 0) {
        console.log("No occupations found.");
    } else {
        console.log("Occupations found, displaying all.");
        console.log(rows);
    }
    return rows;
}

async function getRemoveableOccupations() {
    const { rows } = await pool.query(`
        SELECT o.* 
        FROM occupation o
        LEFT JOIN person p ON o.title = p.job
        WHERE p.job IS NULL
    `);
    console.log("Found removable occupations.");
    return rows;
}

async function createOccupation(title, description, startdate) {
    console.log("Creating occupation.");
    const result = await pool.query(
        "INSERT INTO occupation (title, description, startdate) VALUES ($1, $2, $3) ON CONFLICT (title) DO NOTHING",
        [title, description, startdate],
    );
    if (result.rowCount === 0) {
        console.log("Occupation already exists.");
    } else {
        console.log("Occupation created.");
    }
    return result;
}

async function removeOccupation(title) {
    console.log("Removing occupation.");
    const result = await pool.query("DELETE FROM occupation WHERE title = $1", [
        title,
    ]);
    if (result.rowCount === 0) {
        console.log("Occupation does not exist.");
    } else {
        console.log("Occupation removed.");
    }
    return result;
}

async function getAllPerson() {
    console.log("Calling database for people");
    const { rows } = await pool.query("SELECT * FROM person");
    if (rows.length === 0) {
        console.log("No people found.");
    } else {
        console.log("People found, displaying all.");
        console.log(rows);
    }
    return rows;
}

module.exports = {
    getAllFood,
    createFood,
    removeFood,
    getRemovableFoods,
    getAllOccupations,
    createOccupation,
    removeOccupation,
    getRemoveableOccupations,
    getAllPerson,
};
