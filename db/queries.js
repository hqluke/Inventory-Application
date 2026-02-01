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
    const { rows } = await pool.query("SELECT * FROM person order by id");
    if (rows.length === 0) {
        console.log("No people found.");
    } else {
        console.log("People found, displaying all.");
        console.log(rows);
    }
    return rows;
}

async function createPerson(name, height, weight, favfood, job) {
    console.log("Creating person.");
    const result = await pool.query(
        "INSERT INTO person (name, height, weight, favfood, job) VALUES ($1, $2, $3, $4, $5)",
        [name, height, weight, favfood, job],
    );
    if (result.rowCount === 0) {
        console.log("Person already exists.");
    } else {
        console.log("Person created.");
    }
    return result;
}

async function removePerson(id) {
    console.log("Removing person.");
    const result = await pool.query("DELETE FROM person WHERE id = $1", [id]);
    if (result.rowCount === 0) {
        console.log("Person does not exist.");
    } else {
        console.log("Person removed.");
    }
    return result;
}

async function getPerson(id) {
    console.log("Calling database for people");
    const { rows } = await pool.query("SELECT * FROM person WHERE id = $1", [
        id,
    ]);
    if (rows.length === 0) {
        console.log("No people found.");
    } else {
        console.log("Person found, displaying....");
    }
    return rows;
}

async function editPerson(id, name, height, weight, favfood, job) {
    console.log("Editing person.");
    console.log("Recieved data:", name, height, weight, favfood, job);
    const result = await pool.query(
        "UPDATE person SET name = $1, height = $2, weight = $3, favfood = $4, job = $5 WHERE id = $6",
        [name, height, weight, favfood, job, id],
    );
    console.log("return person rowcount", result);
    if (result.rowCount === 0) {
        console.log("Person does not exist.");
    } else {
        console.log("Person edited.");
    }
    return result;
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
    createPerson,
    removePerson,
    getPerson,
    editPerson,
};
