const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  const { username, password } = req.body;
  // Check if username and password are provided
  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required" });
  }

  // Check if username already exists
  if (isValid(username)) {
    return res.status(400).json({ message: "Username already exists" });
  }

  // Register new user
  users.push({ username, password });
  return res.status(201).json({ message: "User registered successfully" });
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  new Promise((resolve, reject) => {
    resolve(books);
  })
  .then((books) => {
    res.status(200).send(JSON.stringify(books, null, 2));
  })
  .catch((error) => {
    res.status(500).json({ message: "Error retrieving books" });
  });
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',async function (req, res) {
  const isbn = req.params.isbn;
  try {
    const book = await new Promise((resolve, reject) => {
      const foundBook = Object.values(books).filter(book => book.isbn === isbn);
      if (foundBook) {
        resolve(foundBook);
      } else {
        reject("Book not found");
      }
    });
    res.status(200).send(JSON.stringify(book, null, 2));
  } catch (error) {
    res.status(404).json({ message: error });
  }
 });
  
// Get book details based on author
public_users.get('/author/:author',async function (req, res) {
  const author = req.params.author;
  try{
    const book = await new Promise((resolve, reject) => {
      const foundBook = Object.values(books).filter(book => book.author === author);
      if (foundBook) {
        resolve(foundBook);
      } else {
        reject("Book not found");
      }
    });
    res.status(200).send(JSON.stringify(book, null, 2));
  } catch (error) {
    res.status(404).json({ message: error });
  }
});

// Get all books based on title
public_users.get('/title/:title',async function (req, res) {
  const title = req.params.title;
  try{
    const book = await new Promise((resolve, reject) => {
      const foundBook = Object.values(books).filter(book => book.title === title);
      if (foundBook) {
        resolve(foundBook);
      } else {
        reject("Book not found");
      }
    });
    res.status(200).send(JSON.stringify(book, null, 2));
  } catch (error) {
    res.status(404).json({ message: error });
    }
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  let isbn = req.params.isbn;
  let book = Object.values(books).find(book => book.isbn === isbn);
  if (book && book.reviews) {
    res.status(200).send(JSON.stringify(book.reviews, null, 2));
  } else {
    res.status(404).send("Reviews not found");
  }
});

module.exports.general = public_users;
