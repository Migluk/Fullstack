import { getBooks, getBook, addBook, editBook, remBook } from "./app_db.js";
import Joi from "joi";
import express from "express";
import cors from "cors";

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// ---------------------APP-----------------------

app.get("/api/books", async (req, res) => {
  const books = await getBooks();
  res.send(books);
});

app.get("/api/books/:id", async (req, res) => {
  const book = await getBook(req.params.id);
  if (!book) return res.status(404).send("Tokia knyga nerasta :(");
  res.send(book);
});

app.post("/api/books", async (req, res) => {
  validate(req.body);
  const book = await addBook(req.body.author, req.body.title);
  res.send(book);
});

app.put("/api/books/:id", async (req, res) => {
  validate(req.body);
  const book = await editBook(req.params.id, req.body.author, req.body.title);
  res.send(book);
});

app.delete("/api/books/:id", async (req, res) => {
  const books = await remBook(req.params.id);
  res.send(books);
});

app.listen(3000, () => console.log("Listening of port 3000..."));

function validate(r) {
  const schema = Joi.object({
    author: Joi.string().min(5).required(),
    title: Joi.string().min(1).required(),
  });
  const validation = schema.validate(r);
  if (validation.error) {
    res.status(400).send(validation.error.details[0].message);
    return;
  }
}
