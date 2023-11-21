import fs from "fs";
import { readFile } from "fs/promises";

let data = JSON.parse(await readFile("src/database/books.json", "utf8"))?.data;

export const getAll = () => {
  return data;
};

export const getOne = (id) => {
  let book = data.find((book) => book.id === parseInt(id));

  return book;
};

export const addNewOne = (data) => {
  let newBooks = [...data, data];

  fs.writeFileSync(
    "./src/database/books.json",
    JSON.stringify({
      data: newBooks,
    })
  );

  return newBooks;
};
