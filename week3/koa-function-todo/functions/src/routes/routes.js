const Router = require('koa-router');

const {
  getAllTodoController,
  addNewTodoController,
  getByIdController,
  updateTodoController,
  deleteTodoController,
  updateTodoesController,
  deleteTodoesController,
} = require('../handlers/todoController');

const router = new Router({
  prefix: '/api',
});

router.post('/todo', addNewTodoController);

router.get('/todo', getAllTodoController);

router.put('/todo/:id', updateTodoController);

router.put('/todoes', updateTodoesController);

router.get('/todo/:id', getByIdController);

router.delete('/todo/:id', deleteTodoController);

router.delete('/todoes', deleteTodoesController);

module.exports = router;
