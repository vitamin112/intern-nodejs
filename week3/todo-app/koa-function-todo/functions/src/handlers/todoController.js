const {
  getAll,
  getOne,
  addNewOne,
  delTodo,
  deleteTodos,
  updateTodo,
  updateTodos,
} = require('../database/todoRepository');

const getAllTodoController = async (ctx) => {
  try {
    const todos = await getAll();

    ctx.body = {
      success: true,
      data: todos,
      message: 'Get all todo items successfully',
    };
  } catch (error) {
    console.log(error);
    ctx.body = {
      success: false,
      message: error.message,
      data: [],
    };
  }
};

const getByIdController = async (ctx) => {
  try {
    const {id} = ctx.params;

    const todo = await getOne(id);

    if (todo) {
      ctx.body = {
        success: true,
        data: todo,
        message: 'Get todo items successfully',
      };
    }

    ctx.body = {
      success: false,
      message: 'can not find todo with id' + id,
      data: null,
    };
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
    const {data} = ctx.req.body;

    const todeRef = await addNewOne(data);

    if (todeRef) {
      return (ctx.body = {
        data: todeRef,
        success: true,
        message: 'Create successfully',
      });
    }
    return (ctx.body = {
      data: null,
      success: false,
      message: 'Something went wrong',
    });
  } catch (error) {
    console.log(error);
    return (ctx.body = {
      success: false,
      message: error.message,
      data: null,
    });
  }
};

const updateTodoController = async (ctx) => {
  try {
    const {id} = ctx.params;

    const result = await updateTodo(id);

    return (ctx.body = {
      data: result,
      success: true,
      message: 'Update successfully',
    });
  } catch (error) {
    console.log(error);

    return (ctx.body = {
      success: false,
      message: error.message,
      data: null,
    });
  }
};

const updateTodosController = async (ctx) => {
  try {
    const {idList} = ctx.req.body;
    const todo = await updateTodos(idList);

    if (todo) {
      return (ctx.body = {
        data: null,
        success: true,
        message: 'Update successfully',
      });
    }
    return (ctx.body = {
      data: null,
      success: false,
      message: 'Update failed',
    });
  } catch (error) {
    console.log(error);

    return (ctx.body = {
      data: null,
      success: false,
      message: error.message,
    });
  }
};

const deleteTodoController = async (ctx) => {
  try {
    const {id} = ctx.params;

    const todo = await delTodo(id);

    if (todo) {
      return (ctx.body = {
        data: null,
        success: true,
        message: 'Update successfully',
      });
    }
    return (ctx.body = {
      data: null,
      success: false,
      message: 'Update failed',
    });
  } catch (error) {
    console.log(error);

    return (ctx.body = {
      data: null,
      success: false,
      message: error.message,
    });
  }
};

const deleteTodosController = async (ctx) => {
  try {
    const idList = ctx.req.body;

    const todo = await deleteTodos(idList);

    if (todo) {
      return (ctx.body = {
        data: null,
        success: true,
        message: 'Delete successfully',
      });
    }
    return (ctx.body = {
      data: null,
      success: false,
      message: 'Update failed',
    });
  } catch (error) {
    console.log(error);

    return (ctx.body = {
      data: null,
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
  updateTodosController,
  deleteTodoController,
  deleteTodosController,
};
