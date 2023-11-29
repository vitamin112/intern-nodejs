const {
  getAll,
  getOne,
  addNewOne,
  delTodo,
  deleteTodoes,
  updateTodo,
  updateTodoes,
} = require('../database/todoRepository');

const getAllTodoController = async (ctx) => {
  try {
    const todoes = await getAll();

    ctx.body = {
      success: true,
      data: todoes,
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
    const rawData = ctx.req.body;

    const todeRef = await addNewOne(rawData);

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

const updateTodoesController = async (ctx) => {
  try {
    const {idList} = ctx.req.body;
    const todo = await updateTodoes(idList);

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

const deleteTodoesController = async (ctx) => {
  try {
    const idList = ctx.req.body;
    console.log(idList);
    const todo = await deleteTodoes(idList);

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
  updateTodoesController,
  deleteTodoController,
  deleteTodoesController,
};
