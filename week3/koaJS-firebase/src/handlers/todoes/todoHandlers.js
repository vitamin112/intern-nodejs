import todoRepository from '../../database/todoRepository.js';

const getAllTodo = async (ctx) => {
  try {
    const {limit} = ctx.request.query;
    const {sort} = ctx.request.query;

    const todos = await todoRepository.getAll(limit, sort);

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
    const {fields} = ctx.request.query;
    const fieldsArr = fields ? fields.split(',') : [];

    const todo = await todoRepository.getOne(id);

    let result = {};
    fieldsArr.forEach((key) => {
      result[key] = todo[key];
    });

    if (todo) {
      return (ctx.body = {
        data: fields ? result : todo,
      });
    }

    return (ctx.body = {
      success: false,
      message: "can't find todo with id " + id,
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

    const todo = await todoRepository.addNewOne(rawData);
    if (todo) {
      ctx.body = {
        data: todo,
      };
    }
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

    const result = await todoRepository.updTodo(id, rawData);

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

    const todos = await todoRepository.delTodo(id);

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

export default {
  getAllTodo,
  getById,
  addNewTodo,
  updateTodo,
  deleteTodo,
};
