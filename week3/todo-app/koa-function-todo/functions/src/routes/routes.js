const Router = require('koa-router');

const {
  getAllTodoController,
  addNewTodoController,
  getByIdController,
  updateTodoController,
  deleteTodoController,
  updateTodosController,
  deleteTodosController,
} = require('../handlers/todoController');

const router = new Router({
  prefix: '/api',
});

router.post('/todo', addNewTodoController);

router.get('/todo', getAllTodoController);

router.put('/todo/:id', updateTodoController);

router.put('/todos', updateTodosController);

router.get('/todo/:id', getByIdController);

router.delete('/todo/:id', deleteTodoController);

router.delete('/todos', deleteTodosController);

module.exports = router;
