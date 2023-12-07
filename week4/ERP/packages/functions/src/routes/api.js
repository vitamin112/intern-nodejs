import * as employeeController from '@functions/controllers/employeeController';
import * as loginController from '@functions/controllers/loginController';
import Router from 'koa-router';
import {validInputMiddleWare} from '../middleware/validInputMiddleWare';

export default function apiRouter() {
  const router = new Router({prefix: '/api'});

  router.post('/login', loginController.handleLogin);
  router.post('/employees', validInputMiddleWare, employeeController.handleCreate);
  router.get('/employees', employeeController.handlerGetAll);
  router.get('/employees/:id', employeeController.handlerGetOne);

  return router;
}
