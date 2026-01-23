#! /usr/bin/env node
require("dotenv").config();
const { Client } = require("pg");

const SQL = `
CREATE TABLE IF NOT EXISTS food (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name varchar (50) UNIQUE not null
);

CREATE TABLE IF NOT EXISTS ocupation (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  title varchar (100) UNIQUE not null,
  description varchar (255) not null
);

CREATE TABLE IF NOT EXISTS person (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name varchar (5) not null,
  height integer (2) not null,
  weight integer (2) not null,
  age integer (2) not null,
  fav_food varchar (50) references food(name) default 'none',
  job_title varchar (100) references ocupation(title) default '☠︎︎unemployed☠︎︎',
);

INSERT INTO food (name) values ('none');
insert into food (name) values ('chicken thighs');
insert into food (name) values ('cheeseburger');
insert into occupation (title, description) values ('☠︎︎unemployed☠︎︎', '☠︎︎unemployed☠︎︎');
insert into occupation (title, description) values ('student', 'In college');
insert into occupation (title, description) values ('teacher', 'Teaching da young ones');
insert into person (name, height, weight, age, fav_food) values ('☠︎︎luke☠︎︎', 71, 200, 21, 'chicken thighs');
`;

async function main() {
    console.log("seeding...");
    const client = new Client({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        database: process.env.DB_NAME,
        password: process.env.DB_PASSWORD,
        port: process.env.DB_PORT,
        ssl: {
            rejectUnauthorized: false,
        },
    });

    await client.connect();
    await client.query(SQL);
    await client.end();
    console.log("done");
}

main();
