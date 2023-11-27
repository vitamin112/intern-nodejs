const {
  getAll,
  getOne,
  addNewOne,
  delTodo,
  updTodo,
} = require('../database/todoRepository');

const getAllTodo = async (ctx) => {
  try {
    const todos = await getAll();

    ctx.body = {
      data: todos,
    };
  } catch (error) {
    console.log(error);
    ctx.body = {
      success: false,
      message: error.message,
    };
  }
};

const getById = async (ctx) => {
  try {
    const {id} = ctx.params;

    const todo = await getOne(id);

    if (todo) {
      return (ctx.body = {
        data: todo,
      });
    }

    return (ctx.body = {
      success: false,
      message: 'can not find todo with id' + id,
      data: null,
    });
  } catch (error) {
    console.log(error);
    return (ctx.body = {
      success: false,
      message: error.message,
    });
  }
};

const addNewTodo = async (ctx) => {
  try {
    const rawData = await ctx.request.body;

    // const todo = await addNewOne(rawData);

    ctx.body = {
      data: rawData,
    };
  } catch (error) {
    console.log(error);
    return (ctx.body = {
      success: false,
      message: error.message,
    });
  }
};

const updateTodo = async (ctx) => {
  try {
    const {id} = ctx.params;
    const rawData = await ctx.request.body;

    const result = await updTodo(id, rawData);

    return (ctx.body = {
      data: result,
    });
  } catch (error) {
    console.log(error);

    return (ctx.body = {
      success: false,
      message: error.message,
    });
  }
};

const deleteTodo = async (ctx) => {
  try {
    const {id} = ctx.params;

    const todos = await delTodo(id);

    if (todos) {
      return (ctx.body = {
        data: 'success',
      });
    }
  } catch (error) {
    console.log(error);

    return (ctx.body = {
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getAllTodo,
  getById,
  addNewTodo,
  updateTodo,
  deleteTodo,
};
