import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

const db = mysql
  .createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASS,
    database: process.env.DATA,
  })
  .promise();

export async function getBooks() {
  const books = await db.query("SELECT * FROM books");
  return books[0];
}

export async function getBook(id) {
  const book = await db.query("SELECT * FROM books WHERE id = ?", [id]);
  return book[0][0];
}

export async function addBook(author, title) {
  let book = await db.query("INSERT INTO books (author, title) VALUES (?, ?)", [author, title]);
  book = await getBook(book[0].insertId);
  return book;
}

export async function editBook(id, author, title) {
  await db.query("UPDATE books SET author = ?, title = ? WHERE id = ?", [author, title, id]);
  const book = await getBook(id);
  return book;
}

export async function remBook(id) {
  await db.query("DELETE FROM books WHERE id = ?", [id]);
  const books = await getBooks();
  return books;
}
