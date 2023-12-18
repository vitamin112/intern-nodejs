import Router from 'koa-router';
import {getClientData} from '../controllers/clientApiController';

export default function clientApiRouter() {
  const router = new Router({prefix: '/clientApi'});
  router.get('/shop', getClientData);

  return router;
}
