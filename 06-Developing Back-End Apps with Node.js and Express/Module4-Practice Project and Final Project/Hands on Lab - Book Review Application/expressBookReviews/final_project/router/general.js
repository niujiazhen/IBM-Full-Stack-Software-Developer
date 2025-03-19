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
  res.status(200).send(JSON.stringify(books, null, 2));
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  let isbn = req.params.isbn;
  let book = Object.values(books).find(book => book.isbn === isbn);
  if (book) {
    res.status(200).send(JSON.stringify(book, null, 2));
  } else {
    res.status(404).send("Book not found");
  }
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  let author = req.params.author;
  let book = Object.values(books).filter(book => book.author === author);
  if (book.length > 0) {
      res.status(200).send(JSON.stringify(book, null, 2));
  } else {
      res.status(404).send("Book not found");
  }
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  let title = req.params.title;
  let book = Object.values(books).filter(book => book.title === title);
  if (book.length > 0) {
      res.status(200).send(JSON.stringify(book, null, 2));
  } else {
      res.status(404).send("Book not found");
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
