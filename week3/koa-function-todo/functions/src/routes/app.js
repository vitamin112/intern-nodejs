const Router = require('koa-router');
const {getAllTodo, getById, addNewTodo} = require('../handlers/todoController');

const router = new Router({
  prefix: '/api',
});

router.get('/todo/:id', getById);
router.post('/todo', (ctx) => {
  ctx.body = {
    success: true,
    message: 'todo added',
  };
});
router.get('/todo', getAllTodo);
router.get('/todo', getAllTodo);

module.exports = router;
