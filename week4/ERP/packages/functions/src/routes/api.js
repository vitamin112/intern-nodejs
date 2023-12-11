import * as employeeController from '@functions/controllers/employeeController';
import * as loginController from '@functions/controllers/loginController';
import Router from 'koa-router';
import {validInputMiddleWare} from '../middleware/validInputMiddleWare';

export default function apiRouter() {
  const router = new Router({prefix: '/api'});

  router.get('/employees', employeeController.handleGetAll);
  router.get('/employees/:id', employeeController.handleGetOne);
  router.put('/employees', validInputMiddleWare, employeeController.handleEdit);
  router.post('/employees', validInputMiddleWare, employeeController.handleCreate);
  router.post('/login', loginController.handleLogin);
  router.post('/importfilecsv', employeeController.handleImportFileCSV);
  router.delete('/employees', employeeController.handleDelete);

  return router;
}
