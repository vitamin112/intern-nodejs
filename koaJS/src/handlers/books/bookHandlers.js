import { addNewOne, getAll, getOne } from "../../database/bookRepository.js";

export const getAllBooks = async (ctx) => {
  try {
    let books = await getAll();

    ctx.status = 200;
    ctx.body = {
      data: books,
    };
  } catch (error) {
    ctx.status = 500;
    ctx.body = {
      success: false,
      data: [],
      message: error.message,
    };
  }
};

export const getBook = async (ctx) => {
  try {
    const { id } = ctx.params;

    const book = await getOne(id);

    if (book) {
      return (ctx.body = {
        data: book,
      });
    }

    return (ctx.body = {
      success: false,
      message: "can't find book",
      data: null,
    });
  } catch (error) {
    ctx.status = 500;
    return (ctx.body = {
      success: false,
      data: [],
      message: error.message,
    });
  }
};

export const addNewBook = async (ctx) => {
  try {
    const rawData = ctx.request.body;

    const books = await addNewOne(rawData);

    if (books) {
      return (ctx.body = {
        data: books,
      });
    }
  } catch (error) {
    ctx.status = 500;
    return (ctx.body = {
      success: false,
      data: [],
      message: error.message,
    });
  }
};
