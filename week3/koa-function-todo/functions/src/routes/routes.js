const Router = require('koa-router');

const {
  getAllTodoController,
  addNewTodoController,
  getByIdController,
  updateTodoController,
  deleteTodoController,
} = require('../handlers/todoController');

const router = new Router({
  prefix: '/api',
});

router.post('/todo', addNewTodoController);

router.get('/todo', getAllTodoController);

router.put('/todo/:id', updateTodoController);

router.get('/todo/:id', getByIdController);

router.delete('/todo/:id', deleteTodoController);

module.exports = router;
