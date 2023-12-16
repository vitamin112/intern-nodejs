import Router from 'koa-router';
import {createNotification} from '../controllers/webhookOrderController';

export default function webhookRouter() {
  const router = new Router({prefix: '/webhook'});
  router.post('/newOrder', createNotification);

  return router;
}
