const {
  getAll,
  getOne,
  addNewOne,
  delTodo,
  updateTodo,
} = require('../database/todoRepository');

const getAllTodoController = async (ctx) => {
  try {
    const todoes = await getAll();

    ctx.body = {
      data: todoes,
    };
  } catch (error) {
    console.log(error);
    ctx.body = {
      success: false,
      message: error.message,
    };
  }
};

const getByIdController = async (ctx) => {
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

const addNewTodoController = async (ctx) => {
  try {
    const rawData = ctx.req.body;

    const todeRef = await addNewOne(rawData);

    return (ctx.body = {
      data: todeRef,
    });
  } catch (error) {
    console.log(error);
    return (ctx.body = {
      success: false,
      message: error.message,
    });
  }
};

const updateTodoController = async (ctx) => {
  try {
    const {id} = ctx.params;

    const result = await updateTodo(id);

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

const deleteTodoController = async (ctx) => {
  try {
    const {id} = ctx.params;

    const todos = await delTodo(id);

    if (todos) {
      return (ctx.body = {
        data: todos,
      });
    }
    ctx.status = 404;
    return (ctx.body = {
      data: 'not found',
    });
  } catch (error) {
    console.log(error);

    return (ctx.body = {
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getAllTodoController,
  getByIdController,
  addNewTodoController,
  updateTodoController,
  deleteTodoController,
};
