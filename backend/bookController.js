const express = require('express')
const app = express()
const port = 3001

const Pool = require("pg").Pool;
const pool = new Pool({
  user: "user",
  host: "localhost",
  database: "bookshelf1",
  password: "root",
  port: 5432,
});

//get all Cookbooks in our database
const getBooks = async () => {
  try {
    return await new Promise(function (resolve, reject) {
      pool.query("SELECT * FROM books", (error, results) => {
        if (error) {
          reject(error);
        }
        if (results && results.rows) {
          resolve(results.rows);
        } else {
          reject(new Error("No results found"));
        }
      });
    });
  } catch (error_1) {
    console.error(error_1);
    throw new Error("Internal server error");
  }
};
//create a new cookbook in the databsse
const createBook = (body) => {
  return new Promise(function (resolve, reject) {
    const { book_name } = body;
    pool.query(
      "INSERT INTO books (book_name) VALUES ($1) RETURNING *",
      [book_name],
      (error, results) => {
        if (error) {
          reject(error);
        }
        if (results && results.rows) {
          resolve(
            `A new book has been added: ${JSON.stringify(results.rows[0])}`
          );
        } else {
          reject(new Error("No results found"));
        }
      }
    );
  });
};
//Add a new recipe to a cookbook
const createRecipe = (body) => {
  return new Promise(function (resolve, reject) {
    const { name, ingredients, intructions } = body;
    pool.query(
      "INSERT INTO recipies (name, ingredients, intructions) VALUES ($1, $2, $3) RETURNING *",
      [name, ingredients, intructions],
      (error, results) => {
        if (error) {
          reject(error);
        }
        if (results && results.rows) {
          resolve(
            `A new recipe has been added: ${JSON.stringify(results.rows[0])}`
          );
        } else {
          reject(new Error("No results found"));
        }
      }
    );
  });
};
//delete a cookBook
const deleteBook = (id) => {
  return new Promise(function (resolve, reject) {
    pool.query(
      "DELETE FROM books WHERE id = $1",
      [id],
      (error, results) => {
        if (error) {
          reject(error);
        }
        resolve(`Book deleted with ID: ${id}`);
      }
    );
  });
};
//update a Recipe
const updateRecipe = (id, body) => {
  return new Promise(function (resolve, reject) {
    const { name, ingredients, instructions } = body;
    pool.query(
      "UPDATE recipies SET name = $1, ingredients = $2, intructions = $3 WHERE id = $4 RETURNING *",
      [name, ingredients, instructions],
      (error, results) => {
        if (error) {
          reject(error);
        }
        if (results && results.rows) {
          resolve(`Recipe updated: ${JSON.stringify(results.rows[0])}`);
        } else {
          reject(new Error("No results found"));
        }
      }
    );
  });
};
// exporting our functions!!!
module.exports = {
  getBooks,
  createBook,
  createRecipe,
  updateRecipe,
  deleteBook
};